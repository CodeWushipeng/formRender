const TerserPlugin = require('terser-webpack-plugin');

const port = process.env.port || process.env.npm_config_port || 9528; // dev port

module.exports = {
  productionSourceMap: false,
  publicPath: './',
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
    if (process.env.NODE_ENV !== 'development') {
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  devServer: {
    proxy: {
      // 字段交易
      '/testProcess': {
        target: 'http://192.168.1.196:21000',
        changeOrigin: true,
      },
      '/dictionary': {
        target: 'http://192.168.1.194:21009',
        changeOrigin: true,
      },
      '/formDevelop': {
        target: 'http://192.168.1.194:21004',
      },
      '/flowDevelop': {
        target: 'http://192.168.1.194:21004',
      },
      '/listDevelop': {
        target: 'http://192.168.1.194:21004',
      },
      '/requestForward': {
        target: 'http://localhost:38081',
      },
    },
    overlay: {
      warnings: false,
      errors: true,
    },
    // before: require('./mock/mock-server.js')
  },
};
