//第一种 同步代码
// import _ from 'lodash'

// ducument.write(_.join(['a','b'], '.'))

//第二种 异步代码
// function getComponent() {
//     return import(/* webpackChunkName:"lodash" */ 'lodash').then(({default: _}) => {
//         var element = document.createElement('div')
//         element.innerHTML = _.join(['a','b'], '.')
//         return element
//     })
// }
// async function getComponent() {
//     const { default: _ } = await import(/* webpackChunkName:"lodash" */ 'lodash')
//     var element = document.createElement('div')
//     element.innerHTML = _.join(['a', 'b'], '.')
//     return element
// }

document.addEventListener('click', () => {
    import (/* webpackPrefetch: true */'./click').then(({ default: _ }) => {
        _()
    })
})

