// components/nav-swiper.js
import request from '../../utils/request'
import url from '../../assets/api/url'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        height: {
            type: Number,
            value: 360
		},
		paginationPosition: {
			type: String,
			value: 'bottom-right'
		},
		navigation: {
			type: Object,
			value: { type: 'fraction' }
		},
		list: {
			type: Array,
			value: []
		}
    },

    /**
     * 组件的初始数据
     */
    data: {
		swiperList: [],
		loading: false
	},
    lifetimes: {
        ready () {
			if (this.data.list.length) {
				this.setData({swiperList: this.data.list})
				return
			}
			this.setData({loading: true})
            request(url.getSwiperList).then(res => {
                this.setData({swiperList: res, loading: false})
            })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onImageClick (e) {
            const item = this.data.swiperList[e.detail.index]
            let left = item.lastIndexOf('/') + 1
            let right = item.lastIndexOf('.')
            let str = item.slice(left, right)
            wx.navigateTo({
                url: `/subpackage/pages/canvas/canvas?url=${str}`,
            })
        }
    }
})
