import * as THREE from 'three'
import Scene from './Scene'

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('app') as HTMLCanvasElement
})

renderer.setClearColor(0xffa500)
renderer.setSize(width, height)

const mainCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)

const scene = new Scene(mainCamera)
scene.initialize()

function update() {
  scene.updateMovement()
  renderer.render(scene, mainCamera)
  requestAnimationFrame(update)
}

update()
