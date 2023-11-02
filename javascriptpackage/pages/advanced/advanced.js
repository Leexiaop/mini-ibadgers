// pages/advanced/advanced.js
import request from '../../../utils/request'
import url from '../../../assets/api/url'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        advanceList: [],
		active: 0,
		url: ''
	},
	onLoad (options) {
		request(url.getJavascriptAdvanceList).then(res => {
			this.setData({advanceList: res, url: res[options.idx - 0]?.url, active: options.idx - 0})
			wx.setNavigationBarTitle({
				title: res[options.idx - 0]?.title,
			})
		})
	},
    onChange (e) {
        this.setData({
			active: e.detail.value,
			url: this.data.advanceList[e.detail.value]?.url
        })
        wx.setNavigationBarTitle({
            title: e.detail.label,
        })
    },
    onImageClick () {
        wx.previewImage({
            urls: this.data.advanceList.map(advance => advance.url)
		})
	},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return {
            title: 'Ibadgers前端练功房',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/pages/advanced/advanced'
        }
    },
    onShareTimeline () {
        return {
            title: '代码改变世界，我删库跑路！'
        }
    }
})