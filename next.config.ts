
// module.exports = {
//   async headers() {
//     return [
//       {
//         source: "/api/(.*)", 
//         headers: [
//           {
//             key: "Access-Control-Allow-Credentials",
//             value: "true",
//           },
//           {
//             key: "Access-Control-Allow-Origin",
//             value: "http://localhost:3000", 
//           },
//         ],
//       },   
//     ];
//   },
//   images: {
//     domains: ['startinfinity.s3.us-east-2.amazonaws.com'], // ✅ add the actual domain here
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };     

import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
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
    domains: ['startinfinity.s3.us-east-2.amazonaws.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
     
  
};

export default nextConfig;

