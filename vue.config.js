var webpack = require("webpack");
module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    allowedHosts: ["dev.cms.goedu.asia", "localhost", "cms.goedu.asia"],
    headers: { "Access-Control-Allow-Origin": "*" },
    proxy: {
      "/dev-api": {
        target: "http://dev.cms.goedu.asia/api",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/dev-api": "",
        },
      },
      "/local-api": {
        target: "http://localhost:8081",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/local-api": "",
        },
      },
      "/prod-api": {
        target: "https://cms.goedu.asia/api/",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/prod-api": "",
        },
      },
    },
    port: 8082,
  },
};

if (process.env.NODE_ENV === "production") {
}
