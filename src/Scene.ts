import * as THREE from 'three'

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import Weapon from './Weapon'

export default class Scene extends THREE.Scene {
  private readonly mtlLoader = new MTLLoader()
  private readonly objLoader = new OBJLoader()
  private readonly weapon: Weapon
  private readonly camera: THREE.PerspectiveCamera

  private readonly keyDown = new Set<string>()

  private directionVector = new THREE.Vector3()

  constructor(camera: THREE.PerspectiveCamera) {
    super()

    this.camera = camera
    this.weapon = new Weapon(this.mtlLoader, this.objLoader)
  }

  async initialize() {
    // Setup Weapons
    const weapons: THREE.Group[] = await this.weapon.list()
    this.add(...weapons)

    // Setup Light
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 4, 2)
    this.add(light)

    // Setup Camera
    this.camera.position.z = 1
    this.camera.position.y = 0.5

    // Setup EventListener
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      this.keyDown.add(event.key.toLowerCase())
    })
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      this.keyDown.delete(event.key.toLowerCase())
    })
  }

  updateMovement() {
    if (!this.camera) {
      return
    }

    const dir = this.directionVector

    this.camera.getWorldDirection(dir)

    const speed = 0.1

    if (this.keyDown.has('a')) {
      this.camera.rotateY(0.02)
    } else if (this.keyDown.has('d')) {
      this.camera.rotateY(-0.02)
    }

    if (this.keyDown.has('w')) {
      this.camera.position.add(dir.clone().multiplyScalar(speed))
    } else if (this.keyDown.has('s')) {
      this.camera.position.add(dir.clone().multiplyScalar(-speed))
    }
  }
}
