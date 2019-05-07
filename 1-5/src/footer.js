function Footer () {
    const root = document.getElementById("root")
    const div = document.createElement('div')
    div.innerText = "This Is Footer"
    root.append(div)
}

module.exports = Footer