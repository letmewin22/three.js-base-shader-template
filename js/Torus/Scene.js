import * as THREE from 'three'
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { Figure } from './Figure'

export class Scene {
  constructor($selector) {
    this.$container = document.querySelector($selector)
    this.time = 0
    this.figure = null

    this.sizes = {
      w: window.innerWidth,
      h: window.innerHeight,
    }

    this.mouse = {
      destX: 0,
      destY: 0
    }

    this.resize = this.resize.bind(this)
    this.onMousemove = this.onMousemove.bind(this)
    window.addEventListener('resize', this.resize)

    this.init()
    this.animate()
    window.addEventListener('mousemove', this.onMousemove)
  }

  init() {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.sizes.w / this.sizes.h,
      0.01,
      1000
    )
    this.camera.position.z = 1

    this.camera.lookAt(this.scene.position)

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })

    this.renderer.setSize(this.sizes.w, this.sizes.h)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xd3d3d3, 0)

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.light = new THREE.DirectionalLight('#ffe6ae', 5)
    this.light.position.set(7.5, 5, 10)

    
    this.scene.add( this.light )
    this.figure = new Figure(this.scene, {mouse: this.mouse})


    this.$container.appendChild(this.renderer.domElement)
  }

  resize() {
    this.sizes = {...this.sizes, w: window.innerWidth, h: window.innerHeight}

    this.camera.aspect = this.sizes.w / this.sizes.h
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.sizes.w, this.sizes.h)
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }


  animate() {
      requestAnimationFrame(this.animate.bind(this))
      this.time++
      this.scene.rotation.x += (this.mouse.destY - this.scene.rotation.x) * 0.025
      this.scene.rotation.y += (this.mouse.destX - this.scene.rotation.y) * 0.025
      this.figure.animate()
      this.renderer.render(this.scene, this.camera)
  }

  onMousemove(e) {
    const x = (e.clientX - this.sizes.w / 2) / (this.sizes.w / 2)
    const y = (e.clientY - this.sizes.h / 2) / (this.sizes.h / 2)
    this.mouse.destX = -x * 0.5
    this.mouse.destY = -y * 0.5
  }
}