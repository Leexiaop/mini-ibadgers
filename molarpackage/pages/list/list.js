// molarpackage/pages/list/list.js
import url from '../../../assets/api/url'
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
		list: [],
		options: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
		this.setData({options})
		this.selectComponent('#waterfall').reset()
		request(url.getProvinceMolarList).then(res => {
			wx.setNavigationBarTitle({
			  	title: options.name
			})
			this.setData({list: res?.filter(item => item.code === options.code - 0).map(item => {
				return {
					imgUrl: item.url,
					text: item.name,
					id: item.id,
					code: item.code
				}
			})})
		})
	},
	onItemClick(data) {
		wx.navigateTo({
			url: `/molarpackage/pages/details/details?id=${data.detail.id}&&name=${data.detail.text}`
		})
	},

    /**
     * 用户点击右上角分享
     */
	onShareAppMessage() {
		return {
            title: '安达小铺',
            imageUrl: 'https://leexiaop.github.io/static/mini/img/molars/anda.jpg',
            path: `/molarpackage/pages/list/list?code=${this.data.options.code}&&name=${this.data.options.name}`
        }
	},
	onShareTimeline () {
        return {
			title: '安达小铺，休闲时的好陪伴！',
			imageUrl: 'https://leexiaop.github.io/static/mini/img/molars/anda.jpg'
        }
    }
})