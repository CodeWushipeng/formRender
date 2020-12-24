const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  productionSourceMap: false,
  publicPath: './',
  devServer: {
    proxy: {
      // ====upload====
      '/doc/upload': {
        target: 'http://192.168.2.120:32461',
        pathRewrite: {
          '': '',
        },
      },
      // ====字典服务====
      '/requestForward/dictionary': {
        target: 'http://192.168.2.179:31913',
        pathRewrite: {
          '^/requestForward': '',
        },
      },
      // ====表单服务====
      '/requestForward/formDevelop': {
        target: 'http://192.168.2.179:32340',
        pathRewrite: {
          '^/requestForward': '',
        },
      },
      '/formDevelop': {
        target: 'http://192.168.2.179:32340',
        pathRewrite: {
          '^/formDevelop': '',
        },
      },
      // ====流控服务====
      '/flowDevelop': {
        target: 'http://192.168.2.179:32340',
      },
      // ====表格服务====
      '/requestForward/listDevelop': {
        target: 'http://192.168.2.179:32340',
        pathRewrite: {
          '^/requestForward': '',
        },
      },
      // '/requestForward': {
      //   target: 'http://localhost:38081'
      // },
      // '/requestForwardDevelop': {
      //   target: 'http://192.168.1.194:21004'
      // }
    },
    overlay: {
      warnings: false,
      errors: true,
    },
  },
};
