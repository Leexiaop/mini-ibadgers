// pages/index/index.js
import request from '../../utils/request'
import url from '../../assets/api/url'


const imageCdn = 'https://tdesign.gtimg.com/miniprogram/images';
const swiperList = [
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
];
Page({

    /**
     * 页面的初始数据
     */
    data: {
		swiperList,
		navigation: {type: 'dots-bar'},
		javascriptList: [],
		shopList: [],
		guitarList: [],
		noticeList: [],
		active: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
		request(url.getIndexList).then(res => {
			let guitarData = res.guitarList.filter(guitar => guitar.type === 1)
			this.setData({
				javascriptList: res.javascriptList,
				shopList: res.shopList,
				guitarList: wx._.chunk(guitarData, 5),
				noticeList: res.noticeList,
				copyGuitarList: res.guitarList
			})
		})
	},
	onGuitarTabChange(e) {
		const data = this.data.copyGuitarList.filter(guitar => guitar.type === e.currentTarget.dataset.active)
		this.setData({active: e.currentTarget.dataset.active, guitarList: wx._.chunk(data, 5)})
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