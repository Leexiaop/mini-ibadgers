// javascript.js
// 获取应用实例
import request from '../../utils/request'
import url from '../../assets/api/url'

Page({
    data: {
		navList: [],
		noticeContent: '',
        contentList: [],
		swiperList: [],
		loading: false,
		marquee: {speed: 60, loop: -1, delay: 0},
		rowCol: [{ size: '327rpx', borderRadius: '24rpx' }],
		grid: [
			[
			  { width: '96rpx', height: '96rpx', borderRadius: '12rpx' },
			  { width: '96rpx', height: '96rpx', borderRadius: '12rpx' },
			  { width: '96rpx', height: '96rpx', borderRadius: '12rpx' },
			  { width: '96rpx', height: '96rpx', borderRadius: '12rpx' },
			  { width: '96rpx', height: '96rpx', borderRadius: '12rpx' },
			],
			[
			  { width: '96rpx', height: '32rpx', borderRadius: '6rpx' },
			  { width: '96rpx', height: '32rpx', borderRadius: '6rpx' },
			  { width: '96rpx', height: '32rpx', borderRadius: '6rpx' },
			  { width: '96rpx', height: '32rpx', borderRadius: '6rpx' },
			  { width: '96rpx', height: '32rpx', borderRadius: '6rpx' },
			]
		]
    },
    // 事件处理函数

    onLoad() {
		wx.showLoading({
		  	title: '加载中...'
		})
		this.setData({loading: true})
		request(url.getJavascriptSwiperList).then(res => {
			this.setData({navList: res})
		   return request(url.getJavascriptList) 
		}).then(res => {
			this.setData({contentList: res})
			return request(url.getJavascriptNoticeList)
        }).then(res => {
			this.setData({noticeContent: res.content, loading: false})
			wx.hideLoading()
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
	onTipClick (e) {
		const {index} = e.currentTarget.dataset
		if (index === 4) {
			wx.navigateTo({
				url: `/javascriptpackage/pages/resources/resources`
		  	})
			return
		}
		wx.navigateTo({
		  	url: `/javascriptpackage/pages/advanced/advanced?idx=${index}`
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
