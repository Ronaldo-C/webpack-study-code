const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: {  //需要进行打包的第三方模块代码
        vendors: ['lodash'],
        react: ['react-dom', 'react']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, './dll'),
        library: '[name]' //通过全局变量暴露出去
    },
    plugins: [
        new webpack.DllPlugin({ //生成映射文件
            name: '[name]',
            path: path.resolve(__dirname, './dll/[name].manifest.json')
        })
    ]
}