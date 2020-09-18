module.exports = {
  productionSourceMap: false,
  publicPath: './',
  devServer: {
    proxy: {
      // ====字典服务====
      '/requestForward/dictionary': {
        target: 'http://192.168.1.194:21009',
        // target: 'http://192.168.2.84:21008'
        pathRewrite: {
          '^/requestForward': ''
        }
      },
      // ====表单服务====
      '/requestForward/formDevelop': {
        target: 'http://192.168.1.194:21004',
        pathRewrite: {
          '^/requestForward': ''
        }
      },
      // ====流控服务====
      '/requestForward/flowDevelop': {
        target: 'http://192.168.1.194:21004',
        pathRewrite: {
          '^/requestForward': ''
        }
      },
      // ====表格服务====
      '/requestForward/listDevelop': {
        target: 'http://192.168.1.194:21004',
        pathRewrite: {
          '^/requestForward': ''
        }
      }
      // '/requestForward': {
      //   target: 'http://localhost:38081'
      // },
      // '/requestForwardDevelop': {
      //   target: 'http://192.168.1.194:21004'
      // }
    },
    overlay: {
      warnings: false,
      errors: true
    }
  }
}
