import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";


const nextConfig: NextConfig = {
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
