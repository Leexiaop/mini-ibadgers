// javascript.js
// 获取应用实例
import request from '../../utils/request'
import url from '../../assets/api/url'

Page({
    data: {
		noticeContent: '',
        contentList: [],
        swiperList: [],
		marquee: {speed: 60, loop: -1, delay: 0},
		rowCol: [{ size: '327rpx', borderRadius: '24rpx' }]
    },
    // 事件处理函数

    onLoad() {
       	request(url.getJavascriptList).then(res => {
			this.setData({contentList: res})
			return request(url.getJavascriptNoticeList)
        }).then(res => {
			this.setData({noticeContent: res.content})
		})
	},
    onCellClick (e) {
        const {item} = e.currentTarget.dataset
        if (item.disabled) {
            wx.showToast({
                icon: 'none',
                title: '正在建设中，敬请期待...'
            })
            return
        }
        wx.navigateTo({
            url: `/javascriptpackage/pages/list/list?url=${item.url}&&title=${item.title}`
        })
	},
	onTipClick () {
		wx.navigateTo({
		  	url: '/javascriptpackage/pages/advanced/advanced'
		})
	},
    onShareAppMessage () {
        return {
            title: 'Ibadgers前端练功房',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/pages/javascript/javascript'
        }
    },
    onShareTimeline () {
        return {
            title: '代码改变世界，我删库跑路！'
        }
    }
})
