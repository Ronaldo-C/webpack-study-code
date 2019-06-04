const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    externals: ['lodash'], //打包库文件时，不打包lodash，而是业务代码必须加载lodash
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'library.js',
        library: 'library', //script标签引入时，注入全局变量library
        libraryTarget: 'umd' //适合通用的模块引入方式
    }
}