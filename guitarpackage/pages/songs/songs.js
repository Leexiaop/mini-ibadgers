// guitarpackage/pages/songs/songs.js
import url from '../../../assets/api/url'
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
		imgList: [],
		options: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
		wx.setNavigationBarTitle({
		  	title: options.name
		})
		wx.showLoading({
		  	title: '加载中...'
		})
		request(url.getGuitarSongList).then(res => {
			const img = res.find(item => item.name === options.name && item.type === options.type - 0 && item.classify === options.classify - 0)
			this.setData({imgList: img?.images || [], options})
			wx.hideLoading()
		})
	},
	
	onImageClick () {
		wx.previewImage({
		 	urls: this.data.imgList,
		})
	},

	onBackClick () {
		wx.navigateTo({
		  	url: '/guitarpackage/pages/list/list',
		})
	},

    /**
     * 用户点击右上角分享
     */
	onShareAppMessage() {
        return {
            title: this.data.options.name,
            imageUrl: 'http://127.0.0.1:5500/mini/img/guitar/mingyao.jpg',
            path: '/guitarpackage/pages/songs/songs'
        }
    },
    onShareTimeline () {
        return {
			title: this.data.options.name,
			imageUrl: 'http://127.0.0.1:5500/mini/img/guitar/mingyao.jpg',
        }
    }
})