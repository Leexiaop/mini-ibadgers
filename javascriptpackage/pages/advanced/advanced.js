// pages/advanced/advanced.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        advanceList: [
            {
                title: '进阶图谱',
                url: 'https://leexiaop.github.io/static/mini/img/advanced_1.png'
            },
            {
                title: '复习纲要',
                url: 'https://leexiaop.github.io/static/mini/img/advanced_2.png'
            },
            {
                title: '学习进行时',
                url: 'https://leexiaop.github.io/static/mini/img/advanced_3.png'
            },
            {
                title: '面试要点',
                url: 'https://leexiaop.github.io/static/mini/img/advanced_4.png'
            }
        ],
		active: 0,
		url: ''
	},
	onLoad (options) {
		this.setData({url: this.data.advanceList[options.idx - 0]?.url, active: options.idx - 0})
		wx.setNavigationBarTitle({
		  	title: this.data.advanceList[options.idx - 0]?.title,
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