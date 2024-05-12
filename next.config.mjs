/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BOT_TOKEN: process.env.BOT_TOKEN,
    BOT_CHAT_ID: process.env.BOT_CHAT_ID,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3cc8vm8tev909.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
