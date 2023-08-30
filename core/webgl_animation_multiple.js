import * as THREE from '../libs/three.weapp'
import getGLTFLoader from '../jsm/loaders/GLTFLoader'
import {OrbitControls} from '../jsm/controls/OrbitControls'
import getSkeletonUtils from '../jsm/utils/SkeletonUtils'

module.exports = (canvas) => {
    const GLTFLoader = getGLTFLoader(THREE)
    const window = THREE.global
    let { SkeletonUtils } = getSkeletonUtils(THREE)
    let scene = null, camera = null, renderer = null
    let model = null, controls = null, mixers = []
    const clock = new THREE.Clock()
    const init = () => {
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0xa0a0a0)
        scene.fog = new THREE.Fog(0xcccccc, 10, 15)

        camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)
        camera.position.set(1, 2, -12)
        camera.lookAt(0, 1, 0)
        scene.add(camera)

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
        hemiLight.position.set(0, 20, 0)
        scene.add(hemiLight)

        const dirLight = new THREE.DirectionalLight(0xffffff)
        dirLight.position.set(- 3, 10, - 10)
        dirLight.castShadow = true
        dirLight.shadow.camera.top = 10
        dirLight.shadow.camera.bottom = - 10
        dirLight.shadow.camera.left = - 10
        dirLight.shadow.camera.right = 10
        dirLight.shadow.camera.near = 0.1
        dirLight.shadow.camera.far = 40
        scene.add(dirLight)

        const planeGeometry = new THREE.PlaneGeometry(200, 200)
        const planeMaterial = new THREE.MeshPhongMaterial({
            color: 0xcbcbcb,
            depthWrite: false
        })
        const mesh = new THREE.Mesh(planeGeometry, planeMaterial)
        mesh.rotation.x = - Math.PI / 2
        mesh.receiveShadow = true
        scene.add(mesh)

        const loader = new GLTFLoader()
        wx.showLoading()
        loader.load('https://Leexiaop.github.io/static/resources/threejs/models/gltf/Soldier.glb', gltf => {
            wx.hideLoading()
            model = gltf.scene
            scene.add(model)
            model.traverse(object => {
                if (object.isMesh) {
                    object.castShadow = true
                }
            })

            Array.from({length: 4}, (_, index) => {
                let model = SkeletonUtils.clone(gltf.scene)
                let mixer = new THREE.AnimationMixer(model)
                mixer.clipAction(gltf.animations[index]).play()
                mixers.push(mixer)
                model.position.x = index - 2
                const skeleton = new THREE.SkeletonHelper(model)
                skeleton.visible = true
                scene.add(skeleton)
                scene.add(model)
            })
        })

        renderer = new THREE.WebGLRenderer({canvas, antialias: true})
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.deviceOixeRatio)
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
        const delta = clock.getDelta()
        mixers.forEach(mixer => mixer.update(delta))
        controls.update()
        renderer.render(scene, camera)
    }
    return {init}
}