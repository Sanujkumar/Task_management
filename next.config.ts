   

import type { NextConfig } from "next";


const nextConfig:  NextConfig  = {
  
  async headers() {
    return [
      
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization",
          },
        ],   
      },
    ];
  },
  images: {
    domains: ['img.favpng.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(js|ts|tsx)$/,
      exclude: [
        /node_modules/,
        /C:\\Users\\sanuj\\Application Data/ // explicitly exclude problematic path
      ],
    });
    return config;
  },
  
};

export default nextConfig;

