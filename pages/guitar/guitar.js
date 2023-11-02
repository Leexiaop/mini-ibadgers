// pages/guitar/guitar.js
import request from '../../utils/request'
import url from '../../assets/api/url'

const count = 4
Page({

    /**
     * 页面的初始数据
     */
    data: {
		active: 1,
		list: [],
		navList: [],
		singerList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
		wx.showLoading({
		  	title: '加载中...',
		})
		request(url.getGuitarList).then(res => {
			const data = res.list.filter(item => item.type === this.data.active)
			this.setData({navList: res.navList, copyList: res.list, list: wx._.chunk(data, count), singerList: wx._.uniqBy(res.list, 'author')})
			wx.hideLoading()
		})
    },
	onTabClick (e) {
		const data = this.data.copyList.filter(item => item.type === e.currentTarget.dataset.tab)
		this.setData({active: e.currentTarget.dataset.tab, list: wx._.chunk(data, count)})
	},
	onCellClick (e) {
		const {name, type, classify} = e.currentTarget.dataset.item
		wx.navigateTo({
		  	url: `/guitarpackage/pages/songs/songs?name=${name}&&type=${type}&&classify=${classify}`
		})
	},
	onVocalistsClick () {
		wx.navigateTo({
		  	url: '/guitarpackage/pages/singers/singers'
		})
	},
	onVocalClick (e) {
		const author = e.currentTarget.dataset.vocal?.author
		let url = '/guitarpackage/pages/list/list'
		if (author) {
			url = `${url}?author=${author}`
		}
		wx.navigateTo({
		  	url
		})
	},
    /**
     * 用户点击右上角分享
     */
	onShareAppMessage() {
        return {
            title: '民谣小馆',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/pages/guitar/guitar'
        }
    },
    onShareTimeline () {
        return {
            title: '民谣有三，爱情、理想、远方，听者有三，孤独、平庸、落魄，听后有三，费烟、废酒、废心！'
        }
    }
})