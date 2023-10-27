// guitarpackage/pages/songs/songs.js
import url from '../../../assets/api/url'
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
		imgList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
		wx.setNavigationBarTitle({
		  	title: options.name
		})
		request(url.getGuitarSongList).then(res => {
			const img = res.find(item => item.name === options.name && item.type === options.type - 0 && item.classify === options.classify - 0)
			this.setData({imgList: img?.images || []})
		})
	},
	
	onImageClick () {
		wx.previewImage({
		 	urls: this.data.imgList,
		})
	},

	onBackClick () {
		wx.navigateBack(-1)
	},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})