import * as THREE from 'three'
import gsap from 'gsap'

import vertex from './shader/vertex.glsl'
import fragment from './shader/fragment.glsl'

export default class Figure {

  constructor(scene, $img) {
    this.scene = scene
    this.$img = $img

    this.speed = 0
    this.targetSpeed = 0
    this.time = 0
    this.mouse = new THREE.Vector2()
    this.followMouse = new THREE.Vector2()
    this.prevMouse = new THREE.Vector2()

    // this.mouseMove = this.mouseMove.bind(this)
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)

    // this.$img.addEventListener('mousemove', this.mouseMove)
    this.$img.addEventListener('mouseenter', this.mouseEnter)
    this.$img.addEventListener('mouseleave', this.mouseLeave)

    this.loader = new THREE.TextureLoader()
    this.createMesh()
  }

  createMesh() {

    this.image = this.loader.load(this.$img.getAttribute('src'))
    this.$img.classList.add('js-hidden')

    this.sizes = new THREE.Vector2(0, 0)
    this.offset = new THREE.Vector2(0, 0)


    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 80, 80)

    const uniforms = {
      uTexture: {type: 't', value: this.image},
      uTime: {value: 0},
      uState: {value: 0},
      uDistortion: {value: 0}
    }

    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable'
      },
      uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.getSizes()

    this.mesh.position.set(this.offset.x, this.offset.y, 0)
    this.mesh.scale.set(this.sizes.x, this.sizes.y, this.sizes.x / 2)
    this.scene.add(this.mesh)

  }

  getSizes() {

    const {width, height, top, left} = this.$img.getBoundingClientRect()

    this.sizes.set(width, height)
    this.offset.set(
      left - window.innerWidth / 2 + width / 2,
      -top + window.innerHeight / 2 - height / 2,
    )
  }

  update() {
    this.time++
    this.getSpeed()
    const m = this.mesh.material.uniforms
    // m.uMouse.value = this.followMouse
    m.uTime.value = this.time
    // m.uVelo.value = Math.min(this.targetSpeed, 0.05)
    this.targetSpeed *=0.999
  }

  resize() {
    this.getSizes()

    this.mesh.position.set(this.offset.x, this.offset.y, 0)
    this.mesh.scale.set(this.sizes.x, this.sizes.y, this.sizes.x / 2)
    // const m = this.mesh.material.uniforms
    // m.uResolution.value.x = window.innerWidth
    // m.uResolution.value.y = window.innerHeight
  }

  mouseMove(e) {
    this.mouse.x = 1.0 - e.offsetX / (this.sizes.x - this.sizes.x / 2)
    this.mouse.y = 1.0 - e.offsetY / (this.sizes.y - this.sizes.y / 2)

  }

  mouseEnter() {
    gsap.to(this.mesh.material.uniforms.uState, {
      duration: 1,
      value: 1,
      ease: 'power2.out'
    })
    gsap.to(this.mesh.material.uniforms.uDistortion, {
      duration: 1,
      value: 1,
      ease: 'power2.out'
    })
    gsap.to(this.mesh.material.uniforms.uDistortion, {
      duration: 1,
      delay: 0.5,
      value: 0,
      ease: 'power2.out'
    })
    // gsap.to(this.mesh.material.uniforms.uState, {
    //   duration: 1,
    //   delay: 0.5,
    //   value: 0,
    //   ease: 'power3.in'
    // })
  }

  mouseLeave() {
    // this.mesh.material.uniforms.uMouse.value = {y: 0, x: 0}
    // this.mesh.material.uniforms.uVelo.value = 0
    gsap.to(this.mesh.material.uniforms.uState, {
      duration: 1,
      value: 0
    })
    gsap.to(this.mesh.material.uniforms.uDistortion, {
      duration: 1,
      value: 1,
      ease: 'power2.out'
    })
    gsap.to(this.mesh.material.uniforms.uDistortion, {
      duration: 1,
      delay: 0.5,
      value: 0,
      ease: 'power2.out'
    })
  }

  scroll(velocity) {
    gsap.to(this.mesh.material.uniforms.uState, {
      duration: 0.5,
      value: velocity.value / 10
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
}
