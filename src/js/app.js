import '@/libs/smoothscroll'

import cssWebP from '@/libs/testWebP'
import Sketch from './Sketch'

cssWebP()
const imgs = document.querySelectorAll('.js-gl-img')
new Sketch('#gl', imgs)
