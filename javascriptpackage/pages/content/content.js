// pages/content/content.js
import request from '../../../utils/request'
import url from '../../../assets/api/url'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        towxml: require('../../towxml/index'),
        content: [],
        loading: false,
        options: null,
        show: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: options.url === 'index' ? '概览' : options.url
		})
		wx.showLoading({
		  	title: '加载中...'
        })
        this.setData({loading: true, options})
        request(`${url.getJavascriptDocList}${options.path}/${options.url}.md`).then(res => {
            if (res) {
				const content = this.data.towxml(res,'markdown', {
					theme: 'dark'
                });
				this.setData({content, loading: false});
				wx.hideLoading()
			};
        }).catch(() => {
			this.setData({loading: false})
		})
    },
    onBtnClick() {
        this.setData({show: true})
    },
    closeDialog() {
        this.setData({show: false})
    },
	onShareAppMessage () {
		 return {
			title: this.data.options.url === 'index' ? '概览' : this.data.options.url || 'Ibadgers前端练功房',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: `/javascriptpackage/pages/content/content?url=${this.data.options.url}&&path=${this.data.options.path}`
        }
	},
    onShareTimeline () {
        return {
			title: this.data.options.url === 'index' ? '概览' : this.data.options.url || '代码改变世界，我删库跑路！',
			path: `url=${this.data.options.url}&&path=${this.data.options.path}`
        }
    }
})