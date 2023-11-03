// guitarpackage/pages/singers/singers.js
import url from '../../../assets/api/url'
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
		list: [],
		loading: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
		wx.showLoading({
		  	title: '加载中...'
		})
		this.setData({loading: true})
		request(url.getGuitarSongCellList).then(res => {
			this.setData({list: wx._.uniqBy(res, 'author').map(singer => {
				return {
					imgUrl: singer.avatar,
					text: singer.author,
					id: singer.id,
					...singer
				}
			}), loading: false})
			wx.hideLoading()
		})
	},
	
	onSingerClick(e) {
		const {author} = e.detail
		wx.navigateTo({
		  	url: `/guitarpackage/pages/list/list?author=${author}`
		})
	},

    /**
     * 用户点击右上角分享
     */
	onShareAppMessage() {
        return {
            title: '民谣小馆',
            imageUrl: 'http://127.0.0.1:5500/mini/img/guitar/mingyao.jpg',
            path: '/guitarpackage/pages/singers/singers'
        }
    },
    onShareTimeline () {
        return {
			title: '你是我患得患失的梦我是你可有可无的人！',
			imageUrl: 'http://127.0.0.1:5500/mini/img/guitar/mingyao.jpg',
        }
    }
})