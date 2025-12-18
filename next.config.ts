import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client"],
   compiler: { styledComponents: true, },
};

export default nextConfig;
