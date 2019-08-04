import * as THREE from '/build/three.module.js'
import { ColladaLoader } from '/build/loaders/ColladaLoader.js'

let renderer, dae, scene, camera      // TODO non-exported class members

const loader = new ColladaLoader()
loader.load('/collada/abb_irb52_7_120.dae', collada => {
    /* const */ dae = collada.scene
 
    dae.traverse(child => {
        if(child.isMesh) {
            // model does not have normals
            child.material.color = new THREE.Color('white')
            child.material.flatShading = true
        }
    })

    dae.scale.x = dae.scale.y = dae.scale.z = 10.0
    dae.updateMatrix()

    init(dae)
})


function init(machine) {
    const container = document.querySelector('body')

    // camera
    /* const */ camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
    const angle = 90
    camera.position.x = Math.cos(angle * Math.PI / 180) * 15
    camera.position.y = 15
    camera.position.z = Math.sin(angle * Math.PI / 180) * 15
    camera.lookAt(0, 5, 0)

    // scene
    /* const */ scene = new THREE.Scene()
    scene.add(machine)

    const grid = new THREE.GridHelper(20, 20)
    scene.add(grid)

    // lights
    const light = new THREE.HemisphereLight(0xffffff, 0x888888)
    scene.add(light)

    // renderer
    /* const */ renderer  = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, innerHeight)
    container.appendChild(renderer.domElement)

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }, false)

    // one shot
    renderer.render(scene, camera)
}

export function colorComponent(component) {
    let currentComponent = 0
    dae.traverse(child => {
        if(child.isMesh) {
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
