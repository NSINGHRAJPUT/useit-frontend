import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@toolkit-pro/shared-types", "@toolkit-pro/shared-utils"],
};

export default nextConfig;
