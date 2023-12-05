import * as THREE from '/build/three.module.js'
import { ColladaLoader } from '/build/loaders/ColladaLoader.js'

export default class Renderer {
    constructor(containerId, modelPath) {
        this.container = document.querySelector('#' + containerId);
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.model = null;

        this.init(modelPath);
    }

    init(modelPath) {
        const loader = new ColladaLoader();
        loader.load(modelPath, collada => {
            this.model = collada.scene;

            this.model.traverse(child => {
                if (child.isMesh) {
                    child.material.color = new THREE.Color('white');
                    child.material.flatShading = true;
                }
            });

            this.model.scale.x = this.model.scale.y = this.model.scale.z = 10.0;
            this.model.updateMatrix();

            this.setupScene();
        });
    }

    setupScene() {
        // camera
        this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 1, 2000);
        const angle = 90;
        this.camera.position.x = Math.cos(angle * Math.PI / 180) * 15;
        this.camera.position.y = 15;
        this.camera.position.z = Math.sin(angle * Math.PI / 180) * 15;
        this.camera.lookAt(0, 5, 0);

        // scene
        this.scene = new THREE.Scene();
        this.scene.add(this.model);

        const grid = new THREE.GridHelper(20, 20);
        this.scene.add(grid);

        // lights
        const light = new THREE.HemisphereLight(0xffffff, 0x888888);
        this.scene.add(light);

        // renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', () => {
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
            this.render();
        }, false);

        // one shot
        this.render();
    }

    colorComponent(component) {
        let currentComponent = 0;
        this.model.traverse(child => {
            if (child.isMesh) {
                if (currentComponent === component) {
                    child.material.color = new THREE.Color('red');

                    const subject = new THREE.Vector3();
                    child.localToWorld(subject);
                    this.camera.lookAt(subject);
                } else {
                    child.material.color = new THREE.Color('white');
                }
                currentComponent++;
            }
        });
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}