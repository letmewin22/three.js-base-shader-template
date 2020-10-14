import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// import gsap from 'gsap'
import vertex from '@/shader/vertex.glsl'
import fragment from '@/shader/fragment.glsl'

export default class Sketch {
  constructor($selector, $imgs = []) {

    this.$container = document.querySelector($selector)
    this.$imgs = $imgs

    this.sizes = {
      w: window.innerWidth,
      h: window.innerHeight
    }

    this.resize = this.resize.bind(this)
    window.addEventListener('resize', this.resize)

    this.init()
    this.animate()
  }

  init() {

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.sizes.w / this.sizes.h,
      0.01,
      1000,
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

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32)

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: {type: 't', value: 0}
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.scene.add(this.mesh)

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
    this.animateRAF = () => {
      requestAnimationFrame(this.animateRAF)
      this.time++
      this.renderer.render(this.scene, this.camera)
    }
    this.animateRAF()
  }
}
