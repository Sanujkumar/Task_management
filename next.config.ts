
module.exports = {
  async headers() {
    return [
      {
        source: "/api/(.*)", 
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000", 
          },
        ],
      },
    ];
  },
  images: {
    domains: ['startinfinity.s3.us-east-2.amazonaws.com'], // ✅ add the actual domain here
  },
};  
  