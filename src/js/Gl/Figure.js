import * as THREE from 'three'
import gsap from 'gsap'

import vertex from './shader/vertex.glsl'
import fragment from './shader/fragment.glsl'

export default class Figure {

  constructor(scene, $img) {
    this.scene = scene
    this.$img = $img

    this.time = 0

    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)

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

  getSizes(currentScroll = 0) {

    const {width, height, top, left} = this.$img.getBoundingClientRect()

    this.sizes.set(width, height)
    this.offset.set(
      left - window.innerWidth / 2 + width / 2,
      currentScroll + window.innerHeight / 2 -top - height / 2,
    )
  }

  update() {
    this.time++
    const m = this.mesh.material.uniforms
    m.uTime.value = this.time
  }

  resize() {
    this.getSizes()
    this.mesh.position.set(this.offset.x, this.offset.y, 0)
    this.mesh.scale.set(this.sizes.x, this.sizes.y, this.sizes.x / 2)
  }

  mouseEnter() {
    gsap.to(this.mesh.material.uniforms.uState, {
      duration: 1.5,
      value: 1,
    })
    gsap.to(this.mesh.material.uniforms.uDistortion, {
      duration: 1.5,
      value: 1
    })
  }

  mouseLeave() {
    gsap.to(this.mesh.material.uniforms.uState, {
      duration: 1.5,
      value: 0
    })
    gsap.to(this.mesh.material.uniforms.uDistortion, {
      duration: 1.5,
      value: 0
    })
  }

}
