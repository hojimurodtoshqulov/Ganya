/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BOT_TOKEN: process.env.BOT_TOKEN,
    BOT_CHAT_ID: process.env.BOT_CHAT_ID,
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
