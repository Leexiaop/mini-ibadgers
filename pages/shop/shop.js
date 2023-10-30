import request from '../../utils/request'
import url from '../../assets/api/url'
Page({

    /**
     * 页面的初始数据
     */
    data: {
		navList: [],
		contentList: [],
		loading: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
		this.initList()
	},
	async initList () {
		this.setData({loading: true})
		const provinceList = await request(url.getProvinceList)
		const {navList, list} = await request(url.getShopList)
		provinceList.forEach((province) => {
			province.children = []
			list.forEach(item => {
				if (province.code === item.code) {
					province.children.push(item)
				}
			})
		})
		this.setData({contentList: provinceList, navList, loading: false})
	},
	onIconTap (e) {
		const {code, name} = e.currentTarget.dataset.content
		wx.navigateTo({
		  	url: `/shoppackage/pages/list/list?code=${code}&&name=${name}`,
		})
	},
	onDetailClick (e) {
		const {id} = e.currentTarget.dataset.item
		wx.navigateTo({
			url: `/shoppackage/pages/details/details?id=${id}`,
	  })
	},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
		return {
            title: '安达小铺',
            imageUrl: 'https://leexiaop.github.io/static/mini/img/shop/anda.jpg',
            path: '/pages/shop/shop'
        }
	},
	onShareTimeline () {
        return {
			title: '安达小铺，休闲时的好陪伴！',
			imageUrl: 'https://leexiaop.github.io/static/mini/img/shop/anda.jpg'
        }
    }
})