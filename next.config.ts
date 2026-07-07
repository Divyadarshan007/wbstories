import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // jsdom (a transitive dep of isomorphic-dompurify) pulls in the ESM-only
  // @exodus/bytes package, which breaks when webpack bundles it for the
  // server — keep it as a plain runtime require() instead.
  serverExternalPackages: ["isomorphic-dompurify", "jsdom"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
