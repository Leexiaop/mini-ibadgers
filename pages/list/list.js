// logs.js
import request from '../../utils/request'
import url from '../../assets/api/url'
Page({
    data: {
        list: [],
        options: null,
        isLoading: false
    },
    onLoad(options) {
        this.setData({options, isLoading: true})
        wx.setNavigationBarTitle({
            title: options.title,
        })
        request(`${url.getIbadgersList}${options.url}.json`).then(res => {
            let data = res
            if (options.url !== 'threejs_case') {
                data = [
                    {
                        name: options.url,
                        children: res
                    }
                ]
            }
            this.setData({list: data, isLoading: false})
        })
    },
    onCellClick (e) {
        const {cell} = e.currentTarget.dataset
        if (this.data.options.url !== 'threejs_case') {
            wx.navigateTo({
                url: `/pages/content/content?url=${cell}&&path=${this.options.url}`,
            })
            return
        }
        if (cell.disabled) {
            wx.showToast({
                icon: 'none',
                title: '开发中,敬请期待...'
            })
            return
        }
        wx.navigateTo({
            url: `/pages/canvas/canvas?url=${cell.name}`,
        })
    },
    onShareAppMessage () {
        return {
            title: 'Ibadgers',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/page/list/list'
        }
    }
})
