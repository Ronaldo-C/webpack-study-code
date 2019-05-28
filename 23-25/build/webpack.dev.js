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
    output: {
        // publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js', //在打包后入口文件中引入的模块文件名使用chunkFilename配置
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2, //配置css-loader 作用于 @import 的资源之前有多少个 loader
                            // modules: true, //css模块
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
        ]
    }
}

module.exports = devConfig