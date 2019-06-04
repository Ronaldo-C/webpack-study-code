const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')

const commonConfig = {
    // development模式：cheap-module-eval-source-map
    // production模式：cheap-module-source-map
    context: path.resolve(__dirname, '../src'),
    entry: {
        main: './index.js', //注意：此处顺序就为index.html引入顺序
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[hash].[ext]', //placeholders占位符 文件名.hash值.文件扩展名
                            outputPath: 'assest/', //打包后文件文件输出目录
                            limit: 102400, //小于102400kb时，打包为base64格式，大于时打包为文件
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[name].[ext]', //placeholders占位符 文件名.hash值.文件扩展名
                            outputPath: 'assest/', //打包后文件文件输出目录
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, //排除node_modules文件中的js文件
                use: [
                    'babel-loader',
                    'imports-loader?this=>window'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // title: 'webpack-study',
            template: '../src/index.html',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'lodash',
            _join: ['lodash', 'join'],
        })
    ],
    performance: false,
    optimization: {
        usedExports: true, //开启Tree Shaking
        splitChunks: {
            chunks: "all", //initial 同步代码 async  异步代码  all 所有
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors'
                }
            }
        }
    }
}

module.exports = (env) => {
    if (env && env.production) {
        return merge(commonConfig, prodConfig)
    }else {
        return merge(commonConfig, devConfig)
    }
}