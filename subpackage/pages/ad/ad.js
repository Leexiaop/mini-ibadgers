// indeppackage/ad/ad.js
import request from '../../../utils/request'
import url from '../../../assets/api/url'
Page({

    /**
     * 页面的初始数据
     */
    data: {
		swiperList: [],
		paginationPosition: 'bottom-right',
		navigation: { type: 'fraction' },
		contentList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
		request(url.getAdSwiperList).then(res => {
			this.setData({swiperList: res})
			return request(url.getProvinceList)
		}).then(res => {
			this.setData({contentList: res})
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