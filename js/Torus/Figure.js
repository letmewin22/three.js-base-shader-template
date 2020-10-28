import * as THREE from 'three'
import * as dat from 'dat.gui'

export class Figure {
  constructor(scene, opts) {
    this.scene = scene
    this.opts = opts
    this.result = 0
    this.clamp = (num, a, b) => {
      return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))
    }
    this.init()

  }

  init() {
    // this.datGui()
    this.createMesh()
  }

  createMesh() {
    this.geometry = new THREE.TorusGeometry(0.3, 0.045, 100, 100)

    this.material = new THREE.MeshStandardMaterial({
      color: 0x30cb2,
      metalness: 0.87,
      flatShading: false,
      roughness: 0.2,
      depthTest: true,
      depthWrite: true,
    })

    this.mesh1 = new THREE.Mesh(this.geometry, this.material)
    this.mesh2 = new THREE.Mesh(this.geometry, this.material)

    this.mesh2.position.x = 0.51
    this.mesh2.rotation.x = 1.07
    this.scene.position.x = -0.225

    this.scene.add(this.mesh1)
    this.scene.add(this.mesh2)
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
      tubularSegments: 200,
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
    this.gui.addColor(this.settings, 'color').onChange(() => {
      this.material.color = new THREE.Color(this.settings.color)
      this.material.needsUpdate = true
    })
    this.gui
      .add(this.settings, 'roughness', 0, 1, 0.01)
      .onChange(() => (this.material.roughness = this.settings.roughness))
    this.gui
      .add(this.settings, 'metalness', 0, 1, 0.01)
      .onChange(() => (this.material.metalness = this.settings.metalness))
    this.gui.add(this.settings, 'flatShading').onChange(() => {
      this.material.flatShading = this.settings.flatShading
      this.material.needsUpdate = true
    })
    this.gui.add(this.settings, 'radius', 0, 1, 0.01).onChange(() => {
      this.mesh1.geometry.parameters.radius = this.settings.radius
      this.mesh2.geometry.parameters.radius = this.settings.radius
    })
    this.gui.add(this.settings, 'tube', 0, 1, 0.01).onChange(() => {
      this.mesh1.geometry.parameters.tube = this.settings.tube
      this.mesh2.geometry.parameters.tube = this.settings.tube
    })
  }

  animate() {
    this.result += (this.opts.mouse.destX - this.scene.rotation.x) * 0.001
    this.result = this.clamp(this.result, 0.45, 0.48)

    this.mesh1.scale.x = 1 + (this.opts.mouse.destX - this.mesh1.scale.x) * 0.04
    this.mesh1.scale.y = 1 + (this.opts.mouse.destX - this.mesh1.scale.y) * 0.04
    
    this.mesh2.position.x = this.result
    this.mesh2.scale.x = 1 + (this.opts.mouse.destX - this.mesh2.scale.x) * 0.025
    this.mesh2.scale.y = 1 + (this.opts.mouse.destX - this.mesh2.scale.y) * 0.025
  }
}
