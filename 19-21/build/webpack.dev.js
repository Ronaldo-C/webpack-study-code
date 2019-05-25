const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const path = require('path')

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    // development模式：cheap-module-eval-source-map
    // production模式：cheap-module-source-map
    devServer: {
        contentBase: './dist',
        open: true,
        port: 3000,
        hot: true, //开启HMR功能
        // hotOnly: true //即使HMR功能没有生效，也不让浏览器自动重新刷新
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        usedExports: true //开启Tree Shaking
    }
}

module.exports = merge(commonConfig, devConfig)