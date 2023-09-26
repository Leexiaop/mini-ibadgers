// indeppackage/ad/ad.js
import url from '../../../assets/api/url'
import request from '../../../utils/request'
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
		request(url.getMolarSwiperList).then(res => {
			this.setData({swiperList: res})
		})
		this.initList()
	},
	async initList () {
		const provinceList = await request(url.getProvinceList)
		const molarList = await request(url.getMolarList)
		provinceList.forEach((province, index) => {
			province.children = []
			province.type = (index + 1) < 2 ? 1 : (this.isPrime(index + 1) ? 2 : 3)
			molarList.forEach(molar => {
				if (province.code === molar.code) {
					province.children.push(molar)
				}
			})
		})
		this.setData({contentList: provinceList})
	},
	isPrime (num) {
		for (var i = 2; i < num; i++) {
			if (num % i==0){
				return false;
			}
		};
		return true;
	},
	onIconTap (e) {
		const {code, name} = e.currentTarget.dataset.content
		wx.navigateTo({
		  	url: `/molarpackage/pages/list/list?code=${code}&&name=${name}`,
		})
	},
	onDetailClick (e) {
		const {id, name} = e.currentTarget.dataset.molar
		wx.navigateTo({
			url: `/molarpackage/pages/details/details?id=${id}&&name=${name}`,
	  })
	},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
		return {
            title: '安达小铺',
            imageUrl: 'https://leexiaop.github.io/static/mini/img/molars/anda.jpg',
            path: '/molarpackage/pages/index/index'
        }
	},
	onShareTimeline () {
        return {
			title: '安达小铺，休闲时的好陪伴！',
			imageUrl: 'https://leexiaop.github.io/static/mini/img/molars/anda.jpg'
        }
    }
})