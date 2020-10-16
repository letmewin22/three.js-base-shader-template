/* eslint-disable max-len */
// import '@/libs/smoothscroll'

import cssWebP from '@/libs/testWebP'
import SmoothScroll from './components/SmoothScroll'
import Scene from './Gl/Scene'

cssWebP()
const imgs = document.querySelectorAll('.js-gl-img')
window.scene = new Scene('#gl', imgs)


// // helper functions
// const MathUtils = {
//   // map number x from range [a, b] to [c, d]
//   map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
//   // linear interpolation
//   lerp: (a, b, n) => (1 - n) * a + n * b
// }

// window.onbeforeunload = function() {
//   window.scrollTo(0, 0)
// }

// const body = document.body
// // scroll position and update function
// let docScroll
// const getPageYScroll = () =>
//   (docScroll = window.pageYOffset || document.documentElement.scrollTop)
// window.addEventListener('scroll', getPageYScroll)


// class SmoothScroll {
//   constructor() {
//     this.shouldRender = true

//     // the <main> element
//     this.DOM = {main: document.querySelector('main')}
//     // the scrollable element
//     // we translate this element when scrolling (y-axis)
//     this.DOM.scrollable = this.DOM.main.querySelector('div[data-scroll]')
//     // the items on the page
//     this.items = []

//     // this.createItems()
//     // this.listenMouse()

//     // here we define which property will change as we scroll the page
//     // in this case we will be translating on the y-axis
//     // we interpolate between the previous and current value to achieve the smooth scrolling effect
//     this.renderedStyles = {
//       translationY: {
//         // interpolated value
//         previous: 0,
//         // current value
//         current: 0,
//         // amount to interpolate
//         ease: 0.1,
//         // current value setter
//         // in this case the value of the translation will be the same like the document scroll
//         setValue: () => docScroll
//       }
//     }
//     // set the body's height
//     this.setSize()
//     // set the initial values
//     this.update()
//     // the <main> element's style needs to be modified
//     this.style()
//     // init/bind events
//     this.initEvents()
//     // start the render loop
//     requestAnimationFrame(() => this.render())
//   }

//   // listenMouse(){
//   //   document.addEventListener('mousemove',()=>{
//   //     this.shouldRender = true;
//   //   })
//   // }


//   update() {
//     // sets the initial value (no interpolation) - translate the scroll value
//     Object.keys(this.renderedStyles).forEach(key => {
//       this.renderedStyles[key].current = this.renderedStyles[
//         key
//       ].previous = this.renderedStyles[key].setValue()
//     })

//     // translate the scrollable element
//     this.setPosition()
//     this.shouldRender = true
//   }
//   setPosition() {
//     // translates the scrollable element
//     if (
//       Math.round(this.renderedStyles.translationY.previous) !==
//         Math.round(this.renderedStyles.translationY.current) ||
//       this.renderedStyles.translationY.previous < 10
//     ) {
//       this.shouldRender = true
//       const offset = -1 * this.renderedStyles.translationY.previous
//       this.DOM.scrollable.style.transform = `translate3d(0,${offset}px,0)`

//       window.scene.updatePos(-offset)
//       // console.log(this.items);
//       for (const item of this.items) {
//         // if the item is inside the viewport call it's render function
//         // this will update the item's inner image translation, based on the document scroll value and the item's position on the viewport
//         if (item.isVisible || item.isBeingAnimatedNow) {
//           item.render(this.renderedStyles.translationY.previous)
//         }
//       }
//     }

//     // if (scene.targetSpeed>0.01) this.shouldRender = true

//     // if (this.shouldRender) {
//     //   this.shouldRender = false
//     //   scene.render()
//     // }

//   }
//   setSize() {
//     // set the heigh of the body in order to keep the scrollbar on the page
//     // console.log(this.DOM.scrollable.scrollHeight, 'HEIGHT');
//     body.style.height = `${this.DOM.scrollable.scrollHeight}px`
//   }

//   createItems() {
//   }

//   style() {
//     // the <main> needs to "stick" to the screen and not scroll
//     // for that we set it to position fixed and overflow hidden
//     this.DOM.main.style.cssText = `
//       position: fixed;
//       width: 100%;
//       height: 100%;
//       top: 0;
//       left: 0;
//       overflow: hidden;
//     `
//   }
//   initEvents() {
//     // on resize reset the body's height
//     window.addEventListener('resize', () => this.setSize())
//   }
//   render() {
//     Object.keys(this.renderedStyles).forEach(key => {
//       this.renderedStyles[key].current = this.renderedStyles[key].setValue()
//       this.renderedStyles[key].previous = MathUtils.lerp(
//         this.renderedStyles[key].previous,
//         this.renderedStyles[key].current,
//         this.renderedStyles[key].ease
//       )
//     })

//     // and translate the scrollable element
//     this.setPosition()

//     // loop..
//     requestAnimationFrame(() => this.render())
//   }
// }

// window.addEventListener('load', () => {
//   // Get the scroll position
//   getPageYScroll()

//   // Initialize the Smooth Scrolling
//   new SmoothScroll()
// })


new SmoothScroll()
