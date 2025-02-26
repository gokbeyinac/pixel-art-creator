/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  assetPrefix: '/pixel-art-creator/',
  basePath: '/pixel-art-creator',
  images: {
    unoptimized: true,
  },
  // GitHub Pages için trailing slash ekle
  trailingSlash: true,
};

module.exports = nextConfig; 