/** @type {import('next').NextConfig} */
import withVideos from "next-videos";

const nextConfig = {
  output: "standalone",
  env: {
    BOT_TOKEN: process.env.BOT_TOKEN,
    BOT_CHAT_ID: process.env.BOT_CHAT_ID,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  images: {
    domains: ["d1j8y44xwwy6mv.cloudfront.net", "d26he8z3dqi9fb.cloudfront.net"],
  },

  webpack(config, options) {
    return config;
  },
};

export default withVideos(nextConfig);
