// pages/index/index.js
import request from '../../utils/request'
import url from '../../assets/api/url'

Page({

    /**
     * 页面的初始数据
     */
    data: {
		navList: [],
		navigation: {type: 'dots-bar'},
		javascriptList: [],
		shopList: [],
		guitarList: [],
		active: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
		request(url.getIndexList).then(res => {
			this.setData({
				navList: res.navList,
				javascriptList: res.javascriptList,
				shopList: res.shopList.map(shop => {
					return {
						imgUrl: shop.url,
						text: shop.name,
						id: shop.id,
						code: shop.code
					}
				}),
				guitarList: res.guitarList.filter(guitar => guitar.type === 1),
				copyGuitarList: res.guitarList
			})
		})
	},
	onGuitarTabChange(e) {
		const data = this.data.copyGuitarList.filter(guitar => guitar.type === e.currentTarget.dataset.active)
		this.setData({active: e.currentTarget.dataset.active, guitarList: data})
	},

	onPageSwitch (e) {
		const {page} = e.currentTarget.dataset
		wx.switchTab({
		  	url: `/pages/${page}/${page}`
		})
	},
	onJavascriptClick (e) {
		const {origin, title} = e.currentTarget.dataset.item
		wx.navigateTo({
		  url: `/javascriptpackage/pages/list/list?url=${origin}&title=${title}`,
		})
	},
	onShopClick (e) {
		console.log(e)
		const {id} = e.currentTarget.dataset.item
		wx.navigateTo({
		  	url: `/shoppackage/pages/details/details?id=${id}`,
		})
	},
	onGuitarClick (e) {
	const {name, type, classify} = e.currentTarget.dataset.item
		wx.navigateTo({
		  	url: `/guitarpackage/pages/songs/songs?name=${name}&&type=${type}&&classify=${classify}`
		})
	},
	onShareAppMessage () {
        return {
            title: 'Ibadgers前端练功房',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/pages/index/index'
        }
    },
    onShareTimeline () {
        return {
            title: '代码改变世界，我删库跑路！'
        }
    }
})