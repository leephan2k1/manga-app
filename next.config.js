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
        domains: [
            'st.nettruyenco.com',
            'st.ntcdntempv3.com',
            'i331.ntcdntempv26.com',
            'animanlab.online',
            'res.cloudinary.com',
            'cdn.myanimelist.net',
        ],
        minimumCacheTTL: 24 * 60 * 60 * 7,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    staticPageGenerationTimeout: 5 * 6 * 1000,
};
