const {PHASE_DEVELOPMENT_SERVER } = require("next/constants")
const isDev = phase === PHASE_DEVELOPMENT_SERVER

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    assetPrefix: isDev ? undefined : 'http://www.moonquakes.online',
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

module.exports = nextConfig;
