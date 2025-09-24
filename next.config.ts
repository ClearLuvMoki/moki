import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";


const nextConfig: NextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        remotePatterns: [
        {
            protocol: "https",
            hostname: "*",
        },
        ],
    },
};

export default withContentCollections(nextConfig);
