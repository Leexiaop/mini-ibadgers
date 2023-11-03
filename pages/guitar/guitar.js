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
		singerList: [],
		loading: false,
		rowCol: [{width: '686rpx', height: '360rpx', borderRadius: '24rpx'}],
		rowCol1: [{width: '210rpx', height: '360rpx', borderRadius: '24rpx'}]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
		wx.showLoading({
		  	title: '加载中...',
		})
		this.setData({loading: true})
		request(url.getGuitarList).then(res => {
			const data = res.list.filter(item => item.type === this.data.active)
			this.setData({navList: res.navList, copyList: res.list, list: wx._.chunk(data, count), singerList: wx._.uniqBy(res.list, 'author'), loading: false})
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
            imageUrl: 'http://127.0.0.1:5500/mini/img/guitar/mingyao.jpg',
            path: '/pages/guitar/guitar'
        }
    },
    onShareTimeline () {
        return {
			title: '你是我患得患失的梦我是你可有可无的人！',
			imageUrl: 'http://127.0.0.1:5500/mini/img/guitar/mingyao.jpg',
        }
    }
})