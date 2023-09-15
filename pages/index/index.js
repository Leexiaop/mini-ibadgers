// index.js
// 获取应用实例
import request from '../../utils/request'
import url from '../../assets/api/url'
Page({
    data: {
        contentList: [],
        swiperList: [],
        timeData: {
            seconds: 5
        }
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
        const {item} = e.currentTarget.dataset
        if (item.disabled) {
            wx.showToast({
                icon: 'none',
                title: '正在建设中，敬请期待...'
            })
            return
        }
        wx.navigateTo({
            url: `/subpackage/pages/list/list?url=${item.url}&&title=${item.title}`
        })
    }, 
    onShareAppMessage () {
        return {
            title: 'Ibadgers',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            desc: 'dadafdafsdada',
            path: '/pages/index/index'
        }
    },
    onShareTimeline () {
        return {
            title: '代码敲了那么久，总觉得还有一行还不是最优秀...'
        }
    }
})
