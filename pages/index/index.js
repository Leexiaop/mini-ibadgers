// index.js
// 获取应用实例
import request from '../../utils/request'
import url from '../../assets/api/url'
const app = getApp()
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
       	request(url.getMainList).then(res => {
			this.setData({contentList: res})
			return request(url.getNoticeContent)
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
            url: `/subpackage/pages/list/list?url=${item.url}&&title=${item.title}`
        })
    },
    onShareAppMessage () {
        return {
            title: 'Ibadgers',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/pages/index/index'
        }
    },
    onShareTimeline () {
        return {
            title: '代码敲了那么久，总觉得还有一行还不是最优秀...'
        }
    }
})
