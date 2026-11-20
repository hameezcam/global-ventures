import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
  // Service pages renamed to the GVS service list (2026-11-20). Old links keep working.
  async redirects() {
    return [
      { source: "/services/strategic-advisory", destination: "/services/strategic-business-restructuring", permanent: true },
      { source: "/services/corporate-finance", destination: "/services/working-capital-and-fund-raising", permanent: true },
      { source: "/services/business-brokerage", destination: "/services/business-and-equity-selling", permanent: true },
      { source: "/services/transaction-advisory", destination: "/services/mergers-and-acquisitions", permanent: true },
    ];
  },
};

export default nextConfig;
