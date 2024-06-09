/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        swcLoader: true,
        swcMinify: true,
      },
};

export default nextConfig;
