# HTML / text export on Vercel (ToolPin)

Tools `html-to-pdf`, `html-to-image`, `text-to-html`, and `text-to-pdf` use TipTap (client) and, for PDF/image output, `POST /api/export-edm`.

## Runtime

| Environment | Browser |
|-------------|---------|
| Local / non-Vercel | `playwright-core` + Playwright Chromium (`npx playwright install chromium`) or `CHROMIUM_PATH` |
| Vercel (`VERCEL=1`) | `playwright-core` + `@sparticuz/chromium` |

Launcher: `src/lib/edm/browser.ts` (`launchEdmBrowser`). Server-only — never import from client components.

Route: `src/app/api/export-edm/route.ts` — `runtime = "nodejs"`, `maxDuration = 60`.

## Local setup

```bash
npm install
npx playwright install chromium
npm run dev
```

Optional: set `CHROMIUM_PATH` and/or `EDM_ASSET_HOSTS` (see `.env.example`).

## Security notes

- JavaScript is disabled in the render context.
- Network is deny-by-default except `data:` / `blob:` / `about:` and allowed HTTPS image/font/stylesheet hosts.
- Private / link-local / metadata hosts are blocked (SSRF).
- Preview iframe uses `sandbox=""` (no scripts, no same-origin).
- Direct response capped ~4 MB (under Vercel’s ~4.5 MB function payload limit).

## Abuse / rate limits

This frontend has **no durable global rate limiter**. An in-memory counter is not reliable across Vercel isolates. Recommended follow-up: Edge Middleware + Redis/Upstash (or Vercel Firewall) on `/api/export-edm`. Export does not require login (same as other free ToolPin tools).

## Function size

`@sparticuz/chromium` is large. Prefer the standard Vercel Node function with `serverExternalPackages` and `outputFileTracingIncludes` for `/api/export-edm` (see `next.config.ts`).

If deploy fails on package size:

1. Confirm Fluid Compute is enabled for the project.
2. For eligible accounts, enable Large Functions (`VERCEL_SUPPORT_LARGE_FUNCTIONS=1`) and re-deploy.
3. Do **not** switch to a third-party PDF API for this feature.

## Vercel Preview checklist

1. Deploy from the `useit-frontend-main` app root (where `package.json` / `next.config.ts` live).
2. Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL`.
3. Confirm `/api/export-edm` is a **Node.js** function (not Edge).
4. Smoke: `/tools/html-to-pdf`, `/tools/html-to-image`, `/tools/text-to-html`, `/tools/text-to-pdf`.
5. Confirm existing ToolPin tools still work.
6. Watch function logs for missing Chromium executable / shared library errors.
