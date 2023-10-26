// list.js
import request from '../../../utils/request'
import url from '../../../assets/api/url'
Page({
    data: {
        list: [],
		options: null,
		isLoading: false,
		title: '',
		towxml: require('../../towxml/index'),
		copyList: []
    },
    onLoad(options) {
        this.setData({options, isLoading: true})
        wx.setNavigationBarTitle({
            title: options.title,
        })
        request(`${url.getJavascriptItemList}${options.url}.json`).then(res => {
            this.setData({list: res, copyList: wx._.cloneDeep(res), isLoading: false})
        })
	},
	onInputChange (e) {
		const {value} = e.detail
		if (value) {
			this.setData({list: this.data.copyList.filter(item => item.indexOf(value) >= 0)})
			return
		}
		this.setData({list: this.data.copyList})
	},
    onCellClick (e) {
        const {cell} = e.currentTarget.dataset
        if (this.data.options.url === 'company') {
            wx.downloadFile({
                url: `${url.getJavascriptDocList}${this.data.options.url}/${cell}.pdf`,
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
                url: `/javascriptpackage/pages/content/content?url=${cell}&&path=${this.data.options.url}`,
            })
            return
        }
        wx.navigateTo({
            url: `/javascriptpackage/pages/canvas/canvas?url=${cell}`,
        })
    },
    onContentClick () {
        wx.setClipboardData({
            data: this.data.content
        })
    },
    onShareAppMessage () {
        return {
            title: 'IbadIbadgers前端练功房',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: `/javascriptpackage/pages/list/list?url=${this.data.options.url}&&title=${this.data.options.title}`
        }
    },
    onShareTimeline () {
        return {
			title: '代码改变世界，我删库跑路！',
			query: `url=${this.data.options.url}&&title=${this.data.options.title}`
        }
    }
})
