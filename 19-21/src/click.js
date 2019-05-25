function getComponent() {
    var element = document.createElement('div')
    element.innerHTML = "Hellow World"
    document.body.appendChild(element)
}

export default getComponent