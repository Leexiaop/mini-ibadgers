// guitarpackage/pages/singers/singers.js
import url from '../../../assets/api/url'
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
		list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
		request(url.getGuitarSongList).then(res => {
			this.setData({list: wx._.uniqBy(res, 'author')})
		})
	},
	
	onSingerClick(e) {
		const {author} = e.currentTarget.dataset.item
		wx.navigateTo({
		  	url: `/guitarpackage/pages/list/list?author=${author}`
		})
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