//第一种 同步代码
// import _ from 'lodash'

// ducument.write(_.join(['a','b'], '.'))

//第二种 异步代码
function getComponent() {
    return import('lodash').then(({default: _}) => {
        var element = document.createElement('div')
        element.innerHTML = _.join(['a','b'], '.')
        return element
    })
}

getComponent().then(element => {
    document.body.appendChild(element)
})
