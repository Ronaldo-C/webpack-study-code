const loaderUtils = require('loader-utils')

module.exports = function (source) { //不能写成箭头函数，会改变里面this指向
    const options = loaderUtils.getOptions(this); //使用该插件获得this.query中的参数
    const callback = this.async() //异步返回结果

    setTimeout(() => {
        const result =  source.replace('Ronaldo', options.name)
        callback(null, result)
    },2000)
}