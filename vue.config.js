const TerserPlugin = require("terser-webpack-plugin");

const port = process.env.port || process.env.npm_config_port || 9528; // dev port


module.exports = {
  productionSourceMap: false,
  publicPath: "./",
  configureWebpack: (config) => {
    let plugins = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            drop_debugger: false,
            drop_console: false,
          },
        },
        sourceMap: false,
        parallel: true,
      }),
    ];
    if (process.env.NODE_ENV !== "development") {
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  devServer: {
    proxy: {
      "/dev-api/dictionary": {
        target: "http://192.168.1.194:21009",
        pathRewrite: { "^/dev-api": "" },
        changeOrigin: true,
      },
      "/dev-api/formDevelop": {
        target: "http://192.168.1.194:21004",
        pathRewrite: { "^/dev-api": "" },
      },
      "/dev-api/flowDevelop": {
        target: "http://192.168.1.194:21004",
        pathRewrite: { "^/dev-api": "" },
      },
      '/dev-api/tableDevelop': {
        target: 'http://192.168.1.194:11004',
        pathRewrite: { '^/dev-api/tableDevelop': '' }
      },
      "/dev-api": {
        // target: "http://192.168.5.142:21000",
        target: 'http://localhost:8081',
        pathRewrite: { "^/dev-api": "" },
        changeOrigin: true,
      },
    },
    overlay: {
      warnings: false,
      errors: true,
    },
    // before: require('./mock/mock-server.js')
  },
};
