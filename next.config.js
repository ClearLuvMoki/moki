/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true
    },
    i18n: {
        locales: ['en-US', 'zh-CN'],
        defaultLocale: 'en-US',
    },
}

module.exports = nextConfig