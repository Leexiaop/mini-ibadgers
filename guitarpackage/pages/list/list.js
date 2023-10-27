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
		request(url.getGuitarSongCellList).then(res => {
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

	onCellClick (e) {
		const {name, type, classify} = e.currentTarget.dataset.item
		wx.navigateTo({
		  	url: `/guitarpackage/pages/songs/songs?name=${name}&&type=${type}&&classify=${classify}`
		})
	},
	onInputChange (e) {
		const {value} = e.detail
		if (value) {
			const list = this.data.copyList.filter(item => item.type === this.data.active && (item.name.indexOf(value) > -1 || item.author.indexOf(value) > -1))
			this.setData({list})
		} else {
			this.setData({list: this.data.copyList.filter(item => item.type === this.data.active)})
		}
	},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})