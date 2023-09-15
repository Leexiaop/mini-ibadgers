// list.js
import request from '../../utils/request'
import url from '../../assets/api/url'
Page({
    data: {
        list: [],
        options: null,
        isLoading: false,
        show: false,
        content: null,
        title: ''
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
        if (this.data.options.url === 'company') {
            wx.downloadFile({
                url: `${url.getIbadgersDoc}${this.data.options.url}/${cell}.pdf`,
                success: res => {
                    wx.openDocument({
                        filePath: res.tempFilePath
                    })
                }
            })
            return
        }
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
    onCodeCheck (e) {
        const {cell, index} = e.currentTarget.dataset
        if (cell.disabled) {
            wx.showToast({
                icon: 'none',
                title: '开发中,敬请期待...'
            })
            return
        }
        this.setData({isLoading: true})
        request(`${url.getCode}${index + 1}_${cell.name}.html`).then(res => {
            this.setData({content: res, show: true, title: cell.name,isLoading: false});
        })
    },
    onClose () {
        this.setData({show: false, content: null})
    },
    onContentClick () {
        wx.setClipboardData({
            data: this.data.content
        })
    },
    onShareAppMessage () {
        return {
            title: 'Ibadgers',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/pages/list/list'
        }
    },
    onShareTimeline () {
        return {
            title: '代码敲了那么久，总觉得还有一行还不是最优秀...'
        }
    }
})
