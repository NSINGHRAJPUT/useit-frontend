import type { Browser } from "playwright-core";
import { launchEdmBrowser } from "@/lib/edm/browser";

export const runtime = "nodejs";
export const maxDuration = 60;

type Format = "png" | "jpg" | "pdf";

const MIME: Record<Format, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  pdf: "application/pdf",
};

/** Stay under Vercel’s ~4.5 MB function response limit. */
const MAX_RESPONSE_BYTES = 4_000_000;
const MAX_HTML_CHARS = 1_000_000;
const MAX_BODY_BYTES = 1_200_000;
const RENDER_TIMEOUT_MS = 20_000;

const allowedAssetHosts = new Set(
  (process.env.EDM_ASSET_HOSTS || "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean),
);

const ASSET_TYPES = new Set(["image", "font", "stylesheet"]);

function isPrivateOrLocalHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (
    host === "localhost" ||
    host === "metadata.google.internal" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  ) {
    return true;
  }

  const ipv4 = host.match(
    /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
  );
  if (ipv4) {
    const [a, b] = host.split(".").map(Number);
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    return false;
  }

  if (host === "::1" || host.startsWith("fe80:") || host.startsWith("fc") || host.startsWith("fd")) {
    return true;
  }

  return false;
}

function isAllowedAssetRequest(url: URL, resourceType: string): boolean {
  if (!ASSET_TYPES.has(resourceType)) return false;
  if (url.protocol !== "https:") return false;
  if (isPrivateOrLocalHost(url.hostname)) return false;
  if (allowedAssetHosts.size > 0 && !allowedAssetHosts.has(url.hostname.toLowerCase())) {
    return false;
  }
  return true;
}

function jsonError(error: string, status: number) {
  return Response.json({ error }, { status });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError("Request body is too large.", 413);
  }

  let browser: Browser | undefined;

  try {
    const data = (await request.json()) as {
      html?: unknown;
      format?: unknown;
      width?: unknown;
    };
    const html = data?.html;
    const format = data?.format;
    const width = data?.width;

    if (typeof html !== "string" || !html.trim()) {
      return jsonError("HTML is required.", 400);
    }
    if (html.length > MAX_HTML_CHARS) {
      return jsonError("HTML is too large (maximum 1 MB).", 413);
    }
    if (format !== "png" && format !== "jpg" && format !== "pdf") {
      return jsonError("Format must be png, jpg, or pdf.", 400);
    }
    if (typeof width !== "number" || !Number.isInteger(width) || width < 360 || width > 1440) {
      return jsonError("Width must be an integer from 360 to 1440.", 400);
    }

    browser = await launchEdmBrowser();

    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: format === "pdf" ? 1 : 2,
      javaScriptEnabled: false,
    });
    const page = await context.newPage();

    await page.route("**/*", async (route) => {
      const req = route.request();
      const url = new URL(req.url());
      if (["data:", "blob:", "about:"].includes(url.protocol)) {
        await route.continue();
        return;
      }
      if (isAllowedAssetRequest(url, req.resourceType())) {
        await route.continue();
        return;
      }
      await route.abort();
    });

    const completeHtml = /<html[\s>]/i.test(html)
      ? html
      : `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`;

    await page.setContent(completeHtml, { waitUntil: "load", timeout: RENDER_TIMEOUT_MS });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(document.images).map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                img.addEventListener("load", () => resolve(), { once: true });
                img.addEventListener("error", () => resolve(), { once: true });
              }),
        ),
      );
    });

    const height = await page.evaluate(() =>
      Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0),
    );

    if (height < 1 || height > 12_000) {
      await context.close();
      return jsonError("Rendered height must be between 1 and 12,000 CSS pixels.", 400);
    }

    let file: Buffer;
    if (format === "pdf") {
      await page.emulateMedia({ media: "screen" });
      file = Buffer.from(
        await page.pdf({
          width: `${width}px`,
          height: `${Math.ceil(height)}px`,
          printBackground: true,
          preferCSSPageSize: false,
          margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
        }),
      );
    } else {
      file = Buffer.from(
        await page.screenshot({
          type: format === "jpg" ? "jpeg" : "png",
          fullPage: true,
          animations: "disabled",
          ...(format === "jpg" ? { quality: 92 } : {}),
        }),
      );
    }

    await context.close();

    if (file.byteLength > MAX_RESPONSE_BYTES) {
      return jsonError(
        "Generated file exceeds the direct download limit (~4 MB). Reduce document height, width, or image quality and try again.",
        413,
      );
    }

    return new Response(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": MIME[format],
        "Content-Disposition": `attachment; filename="toolpin-export.${format}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("EDM export error:", error instanceof Error ? error.message : "unknown");
    return jsonError(
      "Could not render this HTML. Check the markup and that Chromium is available.",
      500,
    );
  } finally {
    await browser?.close().catch(() => undefined);
  }
}
