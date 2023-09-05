// index.js
// 获取应用实例
import request from '../../utils/request'
import url from '../../assets/api/url'
Page({
    data: {
        contentList: [],
        swiperList: [],
        time: 5000,
        count: 5,
        timeData: {
            seconds: 5
        }
    },
    // 事件处理函数

    onLoad() {
        wx.hideTabBar()
        request(url.getSwiperList).then(res => {
            this.setData({swiperList: res})
            return request(url.getMainList)
        }).then(res => {
            this.setData({contentList: res})
        })
    },
    onTimeChange (e) {
        this.setData({timeData: e.detail})
        if (e.detail.seconds <= 0) {
            wx.showTabBar()
        }
    },
    onCellClick (e) {
        const {item} = e.currentTarget.dataset
        if (item.disabled) {
            wx.showToast({
                icon: 'none',
                title: '正在建设中，敬请期待...'
            })
            return
        }
        wx.navigateTo({
            url: `/pages/list/list?title=${item.title}`
        })
    }, 
    onShareAppMessage () {
        return {
            title: 'Ibadgers',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/page/index/index'
        }
    }
})
