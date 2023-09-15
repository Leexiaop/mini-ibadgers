// pages/content/content.js
import request from '../../utils/request'
import url from '../../assets/api/url'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
        request(`${url.getIbadgersDoc}${options.path}/${options.url}.md.i`).then(res => {
            if (res) {
				const content = app.towxml(res,'markdown', {
					theme: 'dark'
                });
				this.setData({content, isLoading: false});
			};
        })
    },
    onShareTimeline () {
        return {
            title: '代码敲了那么久，总觉得还有一行还不是最优秀...'
        }
    }
})