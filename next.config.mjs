/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/images/:path*",
        destination: "/source/images/:path*",
      },
    ];
  },
};

export default nextConfig;
