import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ftp.goit.study',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
        pathname: '/**',
      },
       {
        protocol: "https",
        hostname: "ac.goit.global",
        pathname: "/fullstack/react/**",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
