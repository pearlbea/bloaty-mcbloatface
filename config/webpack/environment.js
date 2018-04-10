const webpack = require('webpack')
const { resolve } = require('path')
const { config, environment } = require('@rails/webpacker')
const typescript = require('./loaders/typescript')
const html = require('./loaders/html')

environment.loaders.append('typescript', typescript)
environment.loaders.append('html', html)
environment.plugins.append('ContextReplacement',
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
    resolve(config.source_path)
  )
)

module.exports = environment
