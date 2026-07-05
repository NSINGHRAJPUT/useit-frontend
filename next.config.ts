import type { NextConfig } from "next";

const requiredPublicEnv = ["NEXT_PUBLIC_API_URL", "NEXT_PUBLIC_SITE_URL"] as const;

function assertPublicEnv() {
  const isProductionBuild =
    process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);

  if (!isProductionBuild) return;

  const missing = requiredPublicEnv.filter((key) => !process.env[key]?.trim());
  if (missing.length === 0) return;

  throw new Error(
    `Missing required environment variable(s) for production build: ${missing.join(", ")}. ` +
      "Set them in Vercel → Project Settings → Environment Variables, then redeploy.",
  );
}

assertPublicEnv();

const nextConfig: NextConfig = {
  transpilePackages: ["@toolkit-pro/shared-types", "@toolkit-pro/shared-utils"],
};

export default nextConfig;
