import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/entity",
        permanent: true,
      },
      {
        source: "/entity",
        destination: "/entity/overview",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
