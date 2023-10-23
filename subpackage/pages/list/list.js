// list.js
import request from '../../../utils/request'
import url from '../../../assets/api/url'
Page({
    data: {
        list: [],
        options: null,
        isLoading: false,
        show: false,
        content: null,
		title: '',
		towxml: require('../../towxml/index'),
		copyList: []
    },
    onLoad(options) {
        this.setData({options, isLoading: true})
        wx.setNavigationBarTitle({
            title: options.title,
        })
        request(`${url.getIbadgersList}${options.url}.json`).then(res => {
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
                url: `/subpackage/pages/content/content?url=${cell}&&path=${this.data.options.url}`,
            })
            return
        }
        wx.navigateTo({
            url: `/subpackage/pages/canvas/canvas?url=${cell}`,
        })
    },
    onCodeCheck (e) {
        const {cell, index} = e.currentTarget.dataset
        if (cell.disabled) {
            wx.showToast({
                icon: 'none',
                title: '建设中,敬请期待...'
            })
            return
        }
        this.setData({isLoading: true})
        request(`${url.getCode}${index + 1}_${cell.name}.html`).then(res => {
			const content = this.data.towxml(res,'html');
            this.setData({content, show: true, title: cell.name,isLoading: false});
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
            path: `/subpackage/pages/list/list?url=${this.data.options.url}&&title=${this.data.options.title}`
        }
    },
    onShareTimeline () {
        return {
			title: '代码敲了那么久，总觉得还有一行还不是最优秀...',
			query: `url=${this.data.options.url}&&title=${this.data.options.title}`
        }
    }
})
