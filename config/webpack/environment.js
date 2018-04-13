const { environment } = require('@rails/webpacker')
const context = require('./plugins/context')
const html = require('./loaders/html')
const typescript = require('./loaders/typescript')

environment.loaders.append('typescript', typescript)
environment.loaders.append('html', html)
environment.plugins.append('ContextReplacement', context)

module.exports = environment
