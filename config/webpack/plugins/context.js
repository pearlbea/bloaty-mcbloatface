const { config } = require('@rails/webpacker');
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = new webpack.ContextReplacementPlugin(
  /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
  resolve(config.source_path)
);
