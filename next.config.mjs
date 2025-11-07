/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yblweksvjcdornkzoghu.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
        search: ""
      }
    ]
  }
    eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
