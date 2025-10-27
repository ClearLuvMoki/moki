import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";


const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/sitemap.xml',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate' },
                ],
            },
        ];
    },
    // async headers() {
    //     return [
    //         {
    //             source: '/:path*',
    //             headers: [
    //                 {
    //                     key: 'Cache-Control',
    //                     value: 'no-cache, no-store, must-revalidate, max-age=0',
    //                 },
    //                 {
    //                     key: 'Pragma',
    //                     value: 'no-cache',
    //                 },
    //                 {
    //                     key: 'Expires',
    //                     value: '0',
    //                 },
    //                 {
    //                     key: 'CF-Cache-Status',
    //                     value: 'BYPASS',
    //                 },
    //             ],
    //         },
    //     ]
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
