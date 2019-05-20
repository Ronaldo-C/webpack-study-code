const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    // development模式：cheap-module-eval-source-map
    // production模式：cheap-module-source-map
    entry: {
        dist: './index.js',
    },
    devServer: {
        contentBase: './dist',
        open: true,
        port: 3000,
        hot: true, //开启HMR功能
        // hotOnly: true //即使HMR功能没有生效，也不让浏览器自动重新刷新
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        usedExports: true
    }
}

module.exports = merge(commonConfig, devConfig)