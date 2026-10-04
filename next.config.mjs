/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vkuserphoto.ru',
        pathname: '/impg/**',
      },
    ],
  },
};

export default nextConfig;
