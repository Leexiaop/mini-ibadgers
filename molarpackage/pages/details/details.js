// molarpackage/pages/details/details.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
		show: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
		wx.setNavigationBarTitle({
		  	title: options.name
		})
    },
	onBuyClick () {
		this.setData({show: true})
	},
	closeDialog () {
		this.setData({show: false})
	},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})