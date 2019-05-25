const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-eval-source-map',
    // development模式：cheap-module-eval-source-map
    // production模式：cheap-module-source-map
    plugins: [
        new CleanWebpackPlugin(),
    ],
}

module.exports = merge(commonConfig, prodConfig)