class CopyRightWebpackPlugin {
    // constructor(options) {
    //     console.log(options)
    // }
 
    apply(compiler) {
        //同步
        compiler.hooks.compile.tap('CopyRightWebpackPlugin', (compilation) => { //一个新的编译(compilation)创建之后，钩入(hook into) compiler。
            console.log('compiler')
        })
        //异步
        compiler.hooks.emit.tapAsync('CopyRightWebpackPlugin', (compilation, callback) => { //emit钩子表示在要生成打包文件夹时执行
            compilation.assets['copyRight.txt'] = { //创建文件
                source: function() {
                    return 'copyRight by Ronaldo'
                },
                size: function() {
                    return 21
                }
            }
            callback()
        })
    }
}

module.exports = CopyRightWebpackPlugin