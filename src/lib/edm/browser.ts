import "server-only";

import chromium from "@sparticuz/chromium";
import { chromium as playwrightChromium, type Browser } from "playwright-core";

/**
 * Launch a headless Chromium suitable for Vercel (serverless binary) or local
 * Playwright Chromium / CHROMIUM_PATH during development.
 *
 * Callers must close the returned browser in a `finally` block.
 */
export async function launchEdmBrowser(): Promise<Browser> {
  const isVercel = process.env.VERCEL === "1";

  if (isVercel) {
    const executablePath = await chromium.executablePath();
    return playwrightChromium.launch({
      args: chromium.args,
      executablePath,
      headless: true,
    });
  }

  const executablePath =
    process.env.CHROMIUM_PATH?.trim() ||
    playwrightChromium.executablePath();

  return playwrightChromium.launch({
    executablePath,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
}
