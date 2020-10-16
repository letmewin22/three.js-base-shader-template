// import '@/libs/smoothscroll'

import cssWebP from '@/libs/testWebP'
import Scene from './Gl/Scene'

cssWebP()
const imgs = document.querySelectorAll('.js-gl-img')
window.scene = new Scene('#gl', imgs)
