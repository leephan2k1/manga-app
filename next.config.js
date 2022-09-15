const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.alias['~'] = path.resolve(__dirname, 'src');

        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    images: {
        unoptimized: true,
        domains: [
            'st.nettruyenco.com',
            'st.ntcdntempv3.com',
            'i331.ntcdntempv26.com',
            's4.anilist.co',
            'animanlab.online',
            'res.cloudinary.com',
            'cdn.myanimelist.net',
            'fastify-stream-proxy-production.up.railway.app',
        ],
        minimumCacheTTL: 24 * 60 * 60 * 7,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    staticPageGenerationTimeout: 5 * 6 * 1000,
};
