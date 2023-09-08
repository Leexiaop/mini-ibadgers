// components/navSwiper.js
import request from '../../utils/request'
import url from '../../assets/api/url'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        height: {
            type: Number,
            value: 340
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        swiperList: []
    },
    lifetimes: {
        attached () {
            request(url.getSwiperList).then(res => {
                this.setData({swiperList: res})
            })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onImageClick (e) {
            const {item} = e.currentTarget.dataset
            let left = item.lastIndexOf('/') + 1
            let right = item.lastIndexOf('.')
            let str = item.slice(left, right)
            wx.navigateTo({
                url: `/pages/canvas/canvas?url=${str}`,
            })
        }
    }
})
