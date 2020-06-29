const TerserPlugin = require('terser-webpack-plugin')


const port = process.env.port || process.env.npm_config_port || 9528 // dev port

module.exports = {
  productionSourceMap: false,
  publicPath: './',
  configureWebpack: config => {
    let plugins = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            drop_debugger: false,
            drop_console: true,
          },
        },
        sourceMap: false,
        parallel: true,
      })
    ]
    if (process.env.NODE_ENV !== 'development') {
      config.plugins = [...config.plugins, ...plugins]
    }
  },
    devServer: {
        port: port,
        open: false,
        proxy: {
            '/dev-api/formDevelop': {
                target: 'http://192.168.1.194:21004',
                pathRewrite: { '^/dev-api': '' }
            },
            '/dev-api/flowDevelop': {
                target: 'http://192.168.1.194:21004',
                pathRewrite: { '^/dev-api': '' }
            },
        },
        overlay: {
            warnings: false,
            errors: true
        },
        // before: require('./mock/mock-server.js')
    },
}
