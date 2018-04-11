const webpack = require('webpack')
const { resolve } = require('path')
const { config, environment } = require('@rails/webpacker')
const typescript = require('./loaders/typescript')
const html = require('./loaders/html')
const workbox = require('workbox-webpack-plugin');

environment.loaders.append('typescript', typescript)
environment.loaders.append('html', html)
environment.plugins.append('ContextReplacement',
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
    resolve(config.source_path)
  )
)
environment.plugins.append('workbox',
  new workbox.GenerateSW({
    swDest: resolve('public', 'sw.js'),
    clientsClaim: true,
    skipWaiting: true,
  })
)

module.exports = environment
