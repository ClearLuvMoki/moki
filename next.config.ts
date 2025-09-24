import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";


const nextConfig: NextConfig = {
    async headers() {
        return [
        {
            source: '/(.*)',
            headers: [
            {
                key: 'Cache-Control',
                value: 'no-store, must-revalidate',
            },
            ],
        },
        ]
    },
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
