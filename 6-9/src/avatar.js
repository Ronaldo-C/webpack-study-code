import styles from './index.scss'

function avatar () {
    var img = require('./wechat.jpg')
    var image = new Image()
    image.src = img
    image.classList.add(styles.avator)
    var root = document.getElementById('root')
    root.append(image)
}
export default avatar