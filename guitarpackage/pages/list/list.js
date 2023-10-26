// guitarpackage/pages/list/list.js
import url from '../../../assets/api/url'
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
		list: [],
		copyList: [],
		isAuthor: false,
		authorInfo: null,
		active: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
		// console.log(!!options.author)
		// this.setData({isAuthor: !!options.author})
		request(url.getGuitarSongList).then(res => {
			if (!options.author) {
				const data = wx._.cloneDeep(res)
				this.setData({isAuthor: false, list: res.filter(item => item.type === this.data.active), copyList: data})
			} else {
				const data = res.filter(item => item.author === options.author)
				this.setData({isAuthor: true, list: data, authorInfo: data[0]})
			}
		})
	},
	onTabClick(e) {
		this.setData({active: e.currentTarget.dataset.tab, list: this.data.copyList.filter(item => item.type === e.currentTarget.dataset.tab)})
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