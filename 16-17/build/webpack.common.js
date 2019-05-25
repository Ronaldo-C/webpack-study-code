const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // development模式：cheap-module-eval-source-map
    // production模式：cheap-module-source-map
    context: path.resolve(__dirname, '../src'),
    entry: {
        dist: './index.js',
    },
    output: {
        // publicPath: '/',
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
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
                loader: "babel-loader",
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // title: 'webpack-study',
            template: '../src/index.html',
        }),
    ],
}