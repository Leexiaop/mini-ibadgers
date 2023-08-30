import getSkeletonUtils from '../jsm/utils/SkeletonUtils.js';
import * as THREE from '../libs/three.weapp'
import getGLTFLoader from '../jsm/loaders/GLTFLoader'
import { OrbitControls } from '../jsm/controls/OrbitControls'


module.exports = (canvas) => {
    let scene = null, camera = null, renderer = null
    let controls = null
    const window = THREE.global
    const init = () => {
        scene = new THREE.Scene()
        scene.background = new THREE.Color()
        scene.fog = new THREE.Fog(0xffffff, 3)

        camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000)
        camera.position.set(2, 3, -10)
        camera.lookAt(0, 20, 0)
        scene.add(camera)

        const 


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
    }
    const animate = () => {
        canvas.requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
    }
    return {init}
}