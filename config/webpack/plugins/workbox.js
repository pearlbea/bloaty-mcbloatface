const { resolve } = require('path');
const workbox = require('workbox-webpack-plugin');

module.exports = new workbox.GenerateSW({
  swDest: resolve('public', 'sw.js'),
  clientsClaim: true,
  skipWaiting: true,
});
