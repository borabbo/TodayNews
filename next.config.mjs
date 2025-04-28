/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false
  },
  images: {
    domains: ['images.unsplash.com', 'randomuser.me', 'api.microlink.io'],
  }
};

export default nextConfig;
