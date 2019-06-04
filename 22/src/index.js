// import './index.css'
// import './style.css'

// console.log(666)


const dom1 = document.createElement('button')
dom1.innerHTML = 'green'
const dom2 = document.createElement('button')
dom2.innerHTML = 'red'
document.getElementById('root').appendChild(dom1)
document.getElementById('root').appendChild(dom2)


dom1.addEventListener('click', () => {
    var link = document.getElementsByTagName('head')[0];
    document.getElementsByTagName('link').forEach(element => {
        link.removeChild(element)
    });
    import(/* webpackChunkName:"green" */'./index.css')
})
dom2.addEventListener('click', () => {
    var link = document.getElementsByTagName('head')[0];
    document.getElementsByTagName('link').forEach(element => {
        link.removeChild(element)
    });
    import(/* webpackChunkName:"red" */'./style.css')
})
