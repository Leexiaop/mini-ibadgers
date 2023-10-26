// shoppackage/pages/details/details.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
		show: false,
		options: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
		this.setData({options})
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
		return {
            title: '安达小铺',
            imageUrl: 'https://leexiaop.github.io/static/mini/img/shop/anda.jpg',
            path: `/shoppackage/pages/details/details?id=${this.data.options.id}&&name=${this.data.options.name}`
        }
	},
	onShareTimeline () {
        return {
			title: '安达小铺，休闲时的好陪伴！',
			imageUrl: 'https://leexiaop.github.io/static/mini/img/shop/anda.jpg'
        }
    }
})