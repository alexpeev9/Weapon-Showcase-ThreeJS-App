import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

export default class Weapon extends THREE.Scene {
  private readonly mtlLoader: MTLLoader
  private readonly objLoader: OBJLoader

  constructor(mtlLoader: MTLLoader, objLoader: OBJLoader) {
    super()
    this.mtlLoader = mtlLoader
    this.objLoader = objLoader
  }

  async list() {
    const w1 = await this.create('assets/rifle.mtl', 'assets/rifle.obj', -1, -2)
    const w2 = await this.create('assets/rifle.mtl', 'assets/sniper.obj', 1, -2)
    return [w1, w2]
  }

  private async create(
    mtlRoot: string,
    objRoot: string,
    xCoord: number,
    zCoord: number
  ) {
    const objMTL = await this.mtlLoader.loadAsync(mtlRoot)
    objMTL.preload()

    this.objLoader.setMaterials(objMTL)

    const modelRoot = await this.objLoader.loadAsync(objRoot)

    modelRoot.rotateY(Math.PI * 0.5)
    modelRoot.position.x = xCoord
    modelRoot.position.z = zCoord

    return modelRoot
  }
}
