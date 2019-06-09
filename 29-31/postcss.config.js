const autoprefixer = require('autoprefixer')
const atImport = require('postcss-import')
module.exports = {
    plugins: [
        atImport(),
        autoprefixer(),
    ]
  }