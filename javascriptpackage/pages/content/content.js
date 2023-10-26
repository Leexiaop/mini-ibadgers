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
        isLoading: false,
        options: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: options.url === 'index' ? '概览' : options.url
        })
        this.setData({isLoading: true, options})
        request(`${url.getJavascriptDocList}${options.path}/${options.url}.md.i`).then(res => {
            if (res) {
				const content = this.data.towxml(res,'markdown', {
					theme: 'dark'
                });
				this.setData({content, isLoading: false});
			};
        })
	},
	onShareAppMessage () {
		 return {
            title: 'Ibadgers前端练功房',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: `/javascriptpackage/pages/content/content?url=${this.data.options.url}&&path=${this.data.options.path}`
        }
	},
    onShareTimeline () {
        return {
			title: '代码改变世界，我删库跑路！',
			path: `url=${this.data.options.url}&&path=${this.data.options.path}`
        }
    }
})