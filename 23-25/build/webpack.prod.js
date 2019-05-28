const CleanWebpackPlugin = require('clean-webpack-plugin')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    // development模式：cheap-module-eval-source-map
    // production模式：cheap-module-source-map
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].chunk.js',
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
        ],
    }
}

module.exports = prodConfig