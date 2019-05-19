// import Header from './header'
// import Content from './content'
// import Footer from './footer'

// var Header = require('./header')
// var Content = require('./content')
// var Footer = require('./footer')
import avatar from './avatar.js'
import styles from './index.scss'

avatar()

var img = require('./wechat.jpg')
var image = new Image()
image.src = img
image.classList.add(styles.avator)
var root  = document.getElementById('root')
root.append(image)

// new Header()
// new Content()
// new Footer()
