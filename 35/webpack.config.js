const path = require('path')
const CopyRightWebpackPlugin = require('./plugins/copy-webpack-plugin.js')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new CopyRightWebpackPlugin({
            name: 'Ronaldo'
        })
    ]
}