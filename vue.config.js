const workboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  devServer: {
    public: 'localhost:8080',
    https: true
  },
  configureWebpack: {
    plugins: [
      new workboxPlugin.InjectManifest({
        swSrc: './src/sw.js',
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
      })
    ]
  },
  transpileDependencies: [
    'vuetify'
  ]
}
