// javascript.js
// 获取应用实例
import request from '../../utils/request'
import url from '../../assets/api/url'
let interstitialAd = null;

Page({
    data: {
		navList: [],
		noticeContent: '',
        contentList: [],
		swiperList: [],
		loading: false,
		marquee: {speed: 60, loop: -1, delay: 0},
		rowCol: [{ size: '327rpx', borderRadius: '24rpx' }],
		grid: Array.from({length: 2}, () => {
			return Array.from({length: 5}, () => {
				return { width: '96rpx', height: '96rpx', borderRadius: '12rpx' }
			})
		})
    },
    // 事件处理函数

    onLoad() {
		if (wx.createInterstitialAd) {
			interstitialAd = wx.createInterstitialAd({
				adUnitId: 'adunit-79bde4a33ee50c05'
			})
			interstitialAd.onLoad();
			interstitialAd.onError((err) => {
				console.error('插屏广告加载失败', err)
			});
			interstitialAd.onClose(() => {
			});
		}
		
		// 在适合的场景显示插屏广告
		if (interstitialAd) {
			interstitialAd.show().catch((err) => {
				console.error('插屏广告显示失败', err)
			});
		}
		
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
