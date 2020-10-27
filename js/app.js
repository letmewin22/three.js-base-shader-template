import * as THREE from 'three'
import * as dat from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const clamp = (num, a, b) => {
  return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))
}

class Sketch {
  constructor($selector, $imgs = []) {
    this.$container = document.querySelector($selector)
    this.$imgs = $imgs
    this.time = 0
    this.result = 0

    this.sizes = {
      w: window.innerWidth,
      h: window.innerHeight,
    }

    this.mouse = {
      destX: 0,
      destY: 0,
    }

    this.resize = this.resize.bind(this)
    this.onMousemove = this.onMousemove.bind(this)
    window.addEventListener('resize', this.resize)

    this.datGui()
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

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.geometry1 = new THREE.TorusGeometry(0.3, 0.045, 100, 100)
    this.geometry2 = new THREE.TorusGeometry(0.3, 0.045, 100, 100)

    // this.light = new THREE.AmbientLight( 0x404040 )
    this.light = new THREE.DirectionalLight('#ffe6ae', 5)
    this.light.position.set(7.5, 5, 10)

    this.scene.add( this.light )

    this.material = new THREE.MeshStandardMaterial({
      color: 0x30cb2,
      metalness: 0.87,
      flatShading: false,
      roughness: 0.2,
      depthTest: true,
      depthWrite: true
    })

    this.mesh1 = new THREE.Mesh(this.geometry1, this.material)
    this.mesh2 = new THREE.Mesh(this.geometry2, this.material)

    this.mesh2.position.x = this.settings.position
    this.mesh2.rotation.x = this.settings.rotationX
    this.scene.position.x = this.settings.scenePos

    this.scene.add(this.mesh1)
    this.scene.add(this.mesh2)

    this.$container.appendChild(this.renderer.domElement)
  }

  resize() {
    this.sizes = {...this.sizes, w: window.innerWidth, h: window.innerHeight}

    this.camera.aspect = this.sizes.w / this.sizes.h
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.sizes.w, this.sizes.h)
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }

  datGui() {
    this.settings = {
      position: 0.51,
      rotationX: 1.07,
      scenePos: -0.225,
      sceneZ: 0.5,
      color: 3036343,
      roughness: 0.24,
      metalness: 0.77,
      flatShading: false,
      radius: 0.3, 
      tube: 0.045, 
      radialSegments: 100, 
      tubularSegments: 200
    }

    this.gui = new dat.GUI()

    this.gui
      .add(this.settings, 'position', 0, 1, 0.01)
      .onChange(() => (this.mesh2.position.x = this.settings.position))
    this.gui
      .add(this.settings, 'rotationX', 0, 5, 0.01)
      .onChange(() => (this.mesh2.rotation.x = this.settings.rotationX))
    this.gui
      .add(this.settings, 'scenePos', -5, 5, 0.01)
      .onChange(() => (this.scene.position.x = this.settings.scenePos))
    this.gui
      .addColor(this.settings, 'color')
      .onChange(() => {
        this.material.color = new THREE.Color(this.settings.color)
        this.material.needsUpdate = true
      }
      )
    this.gui
      .add(this.settings, 'roughness', 0, 1, 0.01)
      .onChange(() => (this.material.roughness = this.settings.roughness))
    this.gui
      .add(this.settings, 'metalness', 0, 1, 0.01)
      .onChange(() => (this.material.metalness = this.settings.metalness))
    this.gui
      .add(this.settings, 'flatShading')
      .onChange(() => {
        this.material.flatShading = this.settings.flatShading 
        this.material.needsUpdate = true
      })
    this.gui
      .add(this.settings, 'radius', 0, 1, 0.01)
      .onChange(() => {
        this.mesh1.geometry.parameters.radius = this.settings.radius
        this.mesh2.geometry.parameters.radius = this.settings.radius
      })
    this.gui
      .add(this.settings, 'tube', 0, 1, 0.01)
      .onChange(() => {
        this.mesh1.geometry.parameters.tube = this.settings.tube
        this.mesh2.geometry.parameters.tube = this.settings.tube
      })
  }


  animate() {
      requestAnimationFrame(this.animate.bind(this))
      this.time++
      this.scene.rotation.x += (this.mouse.destY - this.scene.rotation.x) * 0.025
      this.scene.rotation.y += (this.mouse.destX - this.scene.rotation.y) * 0.025

      this.result += (this.mouse.destX - this.scene.rotation.x) * 0.001

      this.result = clamp(this.result, 0.45, 0.48)

      this.mesh2.position.x = this.result
      this.mesh2.scale.x = 1 + ((this.mouse.destX - this.mesh2.scale.x) * 0.025)
      this.mesh2.scale.y = 1 + ((this.mouse.destX - this.mesh2.scale.y) * 0.025)
      this.mesh1.scale.x = 1 + ((this.mouse.destX - this.mesh1.scale.x) * 0.04)
      this.mesh1.scale.y = 1 + ((this.mouse.destX - this.mesh1.scale.y) * 0.04)

      this.renderer.render(this.scene, this.camera)
  }

  onMousemove(e) {
    const x = (e.clientX - this.sizes.w / 2) / (this.sizes.w / 2)
    const y = (e.clientY - this.sizes.h / 2) / (this.sizes.h / 2)
    this.mouse.destX = -x * 0.5
    this.mouse.destY = -y * 0.5
  }
}

new Sketch('#gl')
