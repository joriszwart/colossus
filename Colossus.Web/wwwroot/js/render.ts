import * as THREE from 'three'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'

const loader = new ColladaLoader()
const collada = await loader.loadAsync('/collada/abb_irb52_7_120.dae')
const dae = collada.scene

dae.traverse((child: THREE.Object3D<THREE.Object3DEventMap>) => {
    if(child instanceof THREE.Mesh) {
        // model does not have normals
        child.material.color = new THREE.Color('white')
        child.material.flatShading = true
    }
})

dae.scale.x = dae.scale.y = dae.scale.z = 10.0
dae.updateMatrix()

const { renderer, scene, camera } = init(dae)

// action!
let angle= 90
const renderLoop = () => {
    camera.position.x = Math.cos(angle * Math.PI / 180) * 15
    camera.position.y = 15
    camera.position.z = Math.sin(angle * Math.PI / 180) * 15
    camera.lookAt(0, 5, 0)
    angle += .1

    renderer.render(scene, camera)


    requestAnimationFrame(renderLoop)
}

renderLoop();


function init(machine: THREE.Object3D<THREE.Object3DEventMap>) {
    const container = document.querySelector('body')!

    // camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)

    // scene
    const scene = new THREE.Scene()
    scene.add(machine)

    const grid = new THREE.GridHelper(20, 20)
    scene.add(grid)

    // lights
    const light = new THREE.HemisphereLight(0xffffff, 0x888888)
    light.intensity = 3
    scene.add(light)

    // renderer
    const renderer  = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, innerHeight)
    container.appendChild(renderer.domElement)

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }, false)

    return { renderer, scene, camera }
}

export function colorComponent(component: number) {
    let currentComponent = 0
    dae.traverse(child => {
        if(child instanceof THREE.Mesh) {
            if(currentComponent == component) {
                child.material.color = new THREE.Color('red')

                const subject = new THREE.Vector3()
                child.localToWorld(subject)
                camera.lookAt(subject)
            } else {
                child.material.color = new THREE.Color('white')
            }
            currentComponent++
        }
    })
}

export function render() {
    renderer.render(scene, camera)
}
