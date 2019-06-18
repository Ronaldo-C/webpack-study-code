const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    // development模式：cheap-module-eval-source-map
    // production模式：cheap-module-source-map
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: './index.js',
        list: './list.js'
    },
    devServer: {
        contentBase: './dist',
        open: true,
        port: 3000,
        hot: true, //开启HMR功能
        hotOnly: true //即使HMR功能没有生效，也不让浏览器自动重新刷新
    },
    output: {
        // publicPath: './',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loaders: ['babel-loader'],
                include: path.resolve(__dirname, 'src')
            },
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // title: 'webpack-study',
            filename: 'index.html',
            template: './index.html',
            chunks: ['react', 'vendors', 'index'],//需要引入的chunks
        }),
        new HtmlWebpackPlugin({
            filename: 'list.html',
            template: './index.html',
            chunks: ['react', 'vendors', 'list'],
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new addAssetHtmlWebpackPlugin({ //把生成的dll文件挂载到html文件中
            filepath: path.resolve(__dirname, './dll/vendors.dll.js')
        }),
        new addAssetHtmlWebpackPlugin({ //把生成的dll文件挂载到html文件中
            filepath: path.resolve(__dirname, './dll/react.dll.js')
        }),
        new webpack.DllReferencePlugin({ //分析引入映射文件
            manifest: path.resolve(__dirname, './dll/vendors.manifest.json')
        }),
        new webpack.DllReferencePlugin({ //分析引入映射文件
            manifest: path.resolve(__dirname, './dll/react.manifest.json')
        })
    ]
}