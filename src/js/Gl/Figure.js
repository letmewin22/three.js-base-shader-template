import * as THREE from 'three'
import gsap from 'gsap'

import vertex from './shader/vertex.glsl'
import fragment from './shader/fragment.glsl'
const createInputEvents = require('simple-input-events')
const event = createInputEvents(window)

export default class Figure {

  constructor(scene, $img) {
    this.scene = scene
    this.$img = $img

    this.speed = 0
    this.targetSpeed = 0
    this.mouse = new THREE.Vector2()
    this.followMouse = new THREE.Vector2()
    this.prevMouse = new THREE.Vector2()

    this.mouseMove()

    this.loader = new THREE.TextureLoader()
    this.createMesh()
  }

  createMesh() {

    this.image = this.loader.load(this.$img.getAttribute('src'))
    this.$img.classList.add('js-hidden')

    this.sizes = new THREE.Vector2(0, 0)
    this.offset = new THREE.Vector2(0, 0)


    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)

    const uniforms = {
      uTexture: {type: 't', value: this.image},
      uResolution: {
        value: new THREE.Vector2(1, window.innerHeight/window.innerWidth),
      },
      uMouse: {value: new THREE.Vector2(-10, -10)},
      uVelo: {value: 0},
    }

    this.material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.getSizes()

    this.mesh.position.set(this.offset.x, this.offset.y, 0)
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)
    this.scene.add(this.mesh)
  }

  getSizes() {

    const {width, height, top, left} = this.$img.getBoundingClientRect()

    // image cover
    // const imageAspect = this.$img.naturalHeight / this.$img.naturalWidth

    // if (height / width < imageAspect) {
    //   height = width / imageAspect

    // } else {
    //   width = height * imageAspect
    // }

    this.sizes.set(width, height)
    this.offset.set(
      left - window.innerWidth / 2 + width / 2,
      -top + window.innerHeight / 2 - height / 2,
    )
  }

  update() {
    this.getSpeed()
    this.mesh.material.uniforms.uMouse.value = this.followMouse
    this.mesh.material.uniforms.uVelo.value = Math.min(this.targetSpeed, 0.05)
    this.targetSpeed *=0.999
  }

  resize() {
    this.getSizes()

    this.mesh.position.set(this.offset.x, this.offset.y, 0)
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)
    this.mesh.material.uniforms.uResolution.value.y =
    window.innerHeight / window.innerWidth
  }

  mouseMove() {
    event.on('move', ({position}) => {
      // mousemove / touchmove
      this.mouse.x = position[0] / window.innerWidth
      this.mouse.y = 1.0 - position[1] / window.innerHeight
    })
  }

  getSpeed() {
    this.speed = Math.sqrt(
      (this.prevMouse.x - this.mouse.x) ** 2 +
        (this.prevMouse.y - this.mouse.y) ** 2,
    )

    this.targetSpeed -= 0.1 * (this.targetSpeed - this.speed)
    this.followMouse.x -= 0.1 * (this.followMouse.x - this.mouse.x)
    this.followMouse.y -= 0.1 * (this.followMouse.y - this.mouse.y)

    this.prevMouse.x = this.mouse.x
    this.prevMouse.y = this.mouse.y
  }

  scrollAnimate({value}) {
    gsap.to(this.mesh.material.uniforms.uDistortion, {
      value: value / 20,
      duration: 0.5,
    })
  }
}
