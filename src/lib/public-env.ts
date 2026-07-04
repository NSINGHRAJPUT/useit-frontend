declare global {
  interface Window {
    __PUBLIC_ENV__?: {
      siteUrl?: string;
      apiUrl?: string;
    };
  }
}

const DEV_SITE_URL = "http://localhost:3000";
const DEV_API_URL = "http://localhost:5001/api";

function readRuntimeEnv(key: "siteUrl" | "apiUrl"): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.__PUBLIC_ENV__?.[key];
}

export function getPublicSiteUrl(): string {
  const fromBuild = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromBuild) return fromBuild;

  const fromRuntime = readRuntimeEnv("siteUrl");
  if (fromRuntime) return fromRuntime;

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  if (process.env.NODE_ENV !== "production") {
    return DEV_SITE_URL;
  }

  return DEV_SITE_URL;
}

export function getPublicApiUrl(): string {
  const fromBuild = process.env.NEXT_PUBLIC_API_URL;
  if (fromBuild) return fromBuild;

  const fromRuntime = readRuntimeEnv("apiUrl");
  if (fromRuntime) return fromRuntime;

  if (process.env.NODE_ENV !== "production") {
    return DEV_API_URL;
  }

  return DEV_API_URL;
}

export function getRuntimePublicEnvScript(): string {
  const payload = JSON.stringify({
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
    apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  });

  return `window.__PUBLIC_ENV__=${payload}`;
}
