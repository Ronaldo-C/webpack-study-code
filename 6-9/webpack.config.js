const path = require('path')

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        dist: './index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'bundle')
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
                            modules: true, //css模块
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
}