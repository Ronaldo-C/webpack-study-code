function Header () {
    const root = document.getElementById("root")
    const div = document.createElement('div')
    div.innerText = "This Is Header"
    root.append(div)
}

module.exports = Header