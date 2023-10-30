// shoppackage/pages/details/details.js
import url from '../../../assets/api/url'
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
		show: false,
		item: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
		request(url.getProvinceShopList).then(res => {
			const item = res.find(obj => obj.id === options.id - 0)
			wx.setNavigationBarTitle({
				title: item.name
			})
			this.setData({item})
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
		return {
            title: '安达小铺',
            imageUrl: 'https://leexiaop.github.io/static/mini/img/shop/anda.jpg',
            path: `/shoppackage/pages/details/details?id=${this.data.item.id}`
        }
	},
	onShareTimeline () {
        return {
			title: '安达小铺，休闲时的好陪伴！',
			imageUrl: 'https://leexiaop.github.io/static/mini/img/shop/anda.jpg'
        }
    }
})