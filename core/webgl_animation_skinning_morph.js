import getSkeletonUtils from '../jsm/utils/SkeletonUtils.js';
import * as THREE from '../libs/three.weapp'
import getGLTFLoader from '../jsm/loaders/GLTFLoader'
import { OrbitControls } from '../jsm/controls/OrbitControls'


module.exports = (canvas) => {
    let scene = null, camera = null, renderer = null
    let controls = null, model = null
    const GLTFLoader = getGLTFLoader(THREE)
    const window = THREE.global
    const init = () => {
        scene = new THREE.Scene()
        scene.background = new THREE.Color()
        scene.fog = new THREE.Fog(0xffffff, 3)

        camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000)
        camera.position.set(2, 3, -10)
        camera.lookAt(0, 20, 0)
        scene.add(camera)

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3)
        hemiLight.position.set(0, 20, 0)
        scene.add(hemiLight)

        const dLight = new THREE.DirectionalLight(0xffffff, 3)
        dLight.position.set(3, 10, 10)
        dLight.shadow.camera.top = 4
        dLight.shadow.camera.left = -4
        dLight.shadow.camera.bottom = -4
        dLight.shadow.camera.right = 4
        dLight.shadow.camera.near = 0.1
        dLight.shadow.camera.far = 40
        dLight.castShadow = true
        scene.add(dLight)

        const planeGeometry = new THREE.PlaneGeometry(2000, 2000)
        const planeMaterial = new THREE.MeshPhongMaterial({color: 0xcbcbcb, depthWrite: false})
        const mesh = new THREE.Mesh(planeGeometry, planeMaterial)
        mesh.rotation.x = -Math.PI / 2
        mesh.receiveShadow = true
        scene.add(mesh)

        const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000)
        grid.material.opacity = 0.2
        grid.material.transparent = true
        scene.add(grid)

        const loader = new GLTFLoader()
        loader.load('https://leexiaop.github.io/static/resources/threejs/models/gltf/RobotExpressive/RobotExpressive.glb', gltf => {
            model = gltf.scene
            scene.add(model)
            model.traverse(object => {
                if (object.isMesh) {
                    object.castShadow = true
                }
            })
        })

        renderer = new THREE.WebGLRenderer({canvas, antialias: true})
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.shadowMap.enabled = true

        controls = new OrbitControls(camera, canvas)
        controls.target.set(0, 0.5, 0)
        controls.update()
        controls.enablePan = true
        controls.enableDamping = true
        animate()
        window.addEventListener('resize', onWindowResize, false)
    }
    const animate = () => {
        canvas.requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
    }
    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    return {init}
}