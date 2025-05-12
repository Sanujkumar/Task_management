// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/api/(.*)", // apply to all API routes
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000", // change this if needed
          },
        ],
      },
    ];
  },
};
  