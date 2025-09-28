import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";


const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate, max-age=0',
                    },
                    {
                        key: 'Pragma',
                        value: 'no-cache',
                    },
                    {
                        key: 'Expires',
                        value: '0',
                    },
                    {
                        key: 'CF-Cache-Status',
                        value: 'BYPASS',
                    },
                ],
            },
        ]
    },
    // experimental: {
    //     dynamicIO: true
    // },
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
