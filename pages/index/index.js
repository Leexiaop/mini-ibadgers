// index.js
// 获取应用实例
import request from '../../utils/request'
import url from '../../assets/api/url'
Page({
    data: {
        contentList: [],
        swiperList: []
    },
    // 事件处理函数

    onLoad() {
        request(url.getSwiperList).then(res => {
            this.setData({swiperList: res})
            return request(url.getMainList)
        }).then(res => {
            this.setData({contentList: res})
        })
    },
    onCellClick (e) {
        const {index} = e.currentTarget.dataset
        if (index === 6) {
            wx.switchTab({
                url: '/pages/company/company'
            })
            return
        }
        wx.navigateTo({
            url: `/pages/list/list?index=${index}`,
        })
    }, 
    onShareAppMessage () {
        return {
            title: 'Ibadgers',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/world.png',
            path: '/page/index/index'
        }
    }
})
