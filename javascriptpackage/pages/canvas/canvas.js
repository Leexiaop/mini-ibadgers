// pages/canvas/canvas.js
const THREE = require('../../libs/three.weapp')
const webgl_animation_multiple = require('../../core/webgl_animation_multiple')
const webgl_animation_skinning_morph = require('../../core/webgl_animation_skinning_morph')
const webgl_camera = require('../../core/webgl_camera')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: '',
        isEmpty: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.createSelectorQuery()
        .select('#c')
        .node()
        .exec((res) => {
            const canvas = THREE.global.registerCanvas(res[0].node)
            if (options?.url) {
                wx.setNavigationBarTitle({
                  title: options?.url.split('_').join(' '),
				})
				this.setData({url: options.url})
                options?.url === 'webgl_animation_multiple' && webgl_animation_multiple(canvas).init()
                options?.url === 'webgl_animation_skinning_morph' && webgl_animation_skinning_morph(canvas).init()
                options?.url === 'webgl_camera' && webgl_camera(canvas).init()
            }
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        THREE.global.clearCanvas()
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return {
            title: this.data.url.split('_').join(' '),
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: `/javascriptpackage/pages/canvas/canvas?url=${this.data.url}`
        }
    },
    touchStart(e) {
        THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
    },
    touchMove(e) {
        THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
    },
    touchEnd(e) {
        THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
	},
	onShareAppMessage() {
        return {
            title: 'Ibadgers前端练功房',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/pages/advanced/advanced'
        }
    },
    onShareTimeline () {
        return {
			title: '代码改变世界，我删库跑路！',
			query: `url=${this.data.url}`
		}
    }
})