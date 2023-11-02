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
	},
    /**
     * 组件的方法列表
     */
    methods: {
        onImageClick (e) {
            this.triggerEvent('onImageClick', e.detail.index)
        }
    }
})
