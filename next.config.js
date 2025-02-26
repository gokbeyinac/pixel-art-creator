/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  // GitHub Pages uses a subdirectory format, so we need to specify the base path
  // Replace 'pixel-art-creator' with your actual repository name
  basePath: '/pixel-art-creator',
  // Disable image optimization since it requires a server
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; 