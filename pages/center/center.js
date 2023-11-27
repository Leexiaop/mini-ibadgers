// pages/center/center.js
import { randomString } from '../../utils/util';
Page({

    /**
     * 页面的初始数据
     */
    data: {
		userInfo: {},
		show: false,
		visible: false
	},
	onLoad () {
		this.setData({userInfo: {nickName: randomString()}})
	},
	closeDialog () {
		this.setData({show: false})
	},
    onCellClick (e) {
		const {type} = e.currentTarget.dataset
        switch (type) {
			case 1:
				wx.setClipboardData({
                    data: 'https://Leexiaop.github.io/ibadgers'
                })
				break
			case 2:
				wx.setClipboardData({
                    data: 'https://Leexiaop.github.io'
                })
				break
			case 3:
				wx.setClipboardData({
                    data: 'https://github.com/Leexiaop'
                })
				break
			case 4:
				wx.setClipboardData({
                    data: 'https://blog.csdn.net/leelxp'
                })
				break
			case 6:
				wx.previewImage({
                    urls: ['https://leexiaop.github.io/static/ibadgers/wechat.jpeg'],
				})
				break
			case 7:
				this.setData({show: true})
				break
			default:
				this.setData({visible: true})
        }
	},
	onVisibleChange () {
		this.setData({visible: false})
	},
	onShareAppMessage() {
        return {
            title: 'Ibadgers前端练功房',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/pages/center/center'
        }
    },
    onShareTimeline () {
        return {
            title: '代码改变世界，我删库跑路！'
        }
    }
})