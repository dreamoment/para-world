<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import ParaWorld from '../package/index'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const ambientLight = new THREE.AmbientLight(0xffffff)
const directionalLight = new THREE.DirectionalLight(0xffffff)
directionalLight.position.set(1, 1, 1)
scene.add(ambientLight, directionalLight)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

camera.position.y += 10


// edit scene
const createWall = () => {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshPhysicalMaterial({ color: 0x00ff00 }))
  return mesh
}
const _player = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhysicalMaterial({ color: 0xff0000 }))
const _wall1 = createWall()
const _wall2 = createWall()
const _wall3 = createWall()
_wall1.position.set(0, 0, 3)
_wall2.position.set(3, 0, 3)
_wall3.position.set(6, 0, 3)
scene.add(_player, _wall1, _wall2, _wall3)

// enter para world
ParaWorld.createTargetByMaterial(_player, new THREE.MeshPhysicalMaterial({ color: 0x0000ff }))
ParaWorld.createCover(_wall1)
ParaWorld.createCover(_wall2)

const animate = () => {
  controls.update();
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
</script>

<template>
</template>

<style scoped>
</style>
