function Content () {
    const root = document.getElementById("root")
    const div = document.createElement('div')
    div.innerText = "This Is Content"
    root.append(div)
}

module.exports = Content