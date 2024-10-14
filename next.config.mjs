/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["page.tsx", "page.ts"],
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
