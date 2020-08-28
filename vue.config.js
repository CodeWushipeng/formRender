module.exports = {
  productionSourceMap: false,
  publicPath: './',
  devServer: {
    proxy: {
      '/dictionary': {
        target: 'http://192.168.1.194:21009',
        // target: 'http://192.168.2.84:21008'
      },
      '/formDevelop': {
        target: 'http://192.168.1.194:21004'
      },
      '/flowDevelop': {
        target: 'http://192.168.1.194:21004'
      },
      '/listDevelop': {
        target: 'http://192.168.1.194:21004'
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
