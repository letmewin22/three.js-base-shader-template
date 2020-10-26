import * as THREE from 'three'
import * as dat from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import vertex from './shader/vertex.glsl'
import fragment from './shader/fragment.glsl'



class Sketch {
  constructor($selector, $imgs = []) {

    this.$container = document.querySelector($selector)
    this.$imgs = $imgs
    this.time = 0

    this.sizes = {
      w: window.innerWidth,
      h: window.innerHeight
    }

    this.mouse = {
      destX: 0,
      destY: 0
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
    this.geometry1 = new THREE.TorusGeometry( 0.25, 0.035, 10, 100 )
    this.geometry2 = new THREE.TorusGeometry( 0.25, 0.035, 10, 100 )

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: {type: 't', value: 0}
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true
    })

    this.mesh1 = new THREE.Mesh(this.geometry1, this.material)
    this.mesh2 = new THREE.Mesh(this.geometry2, this.material)

    this.mesh2.position.x = this.settings.position
    this.mesh2.rotation.x = this.settings.rotationX
    this.mesh2.rotation.y = this.settings.rotationY
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
      position: 0.45,
      rotationX: 1.07,
      rotationY: 1.78,
      scenePos: -0.225,
      sceneZ: 0.5
    }

    this.gui = new dat.GUI()

    this.gui.add(this.settings, 'position', 0, 1, 0.01).onChange(() => this.mesh2.position.x = this.settings.position)
    this.gui.add(this.settings, 'rotationX', 0, 5, 0.01).onChange(() => this.mesh2.rotation.x = this.settings.rotationX)
    this.gui.add(this.settings, 'rotationY', 0, 5, 0.01).onChange(() => this.mesh2.rotation.y = this.settings.rotationY)
    this.gui.add(this.settings, 'scenePos', -5, 5, 0.01).onChange(() => this.scene.position.x = this.settings.scenePos)
  }

  animate() {
    this.animateRAF = () => {
      requestAnimationFrame(this.animateRAF)
      this.time++
      this.scene.rotation.x += (this.mouse.destX - this.scene.rotation.x)*0.05;
      this.scene.rotation.y += (this.mouse.destY - this.scene.rotation.y)*0.05;
      this.renderer.render(this.scene, this.camera)
    }
    this.animateRAF()
  }

  onMousemove(e) {
    const x = (e.clientX-this.sizes.w/2)/(this.sizes.w/2)
    const y = (e.clientY-this.sizes.h/2)/(this.sizes.h/2)
    this.mouse.destX = y*0.5
    this.mouse.destY = x*0.5
  }
}

new Sketch('#gl')



// function render() {
//   scene.rotation.x += (scene.destination.x - scene.rotation.x)*0.05;
//   scene.rotation.y += (scene.destination.y - scene.rotation.y)*0.05;
//   renderer.render(scene, camera);
// }

