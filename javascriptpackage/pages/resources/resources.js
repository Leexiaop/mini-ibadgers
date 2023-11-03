// pages/resources/resources.js
import request from '../../../utils/request'
import url from '../../../assets/api/url'
import Dialog from 'tdesign-miniprogram/dialog'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        barList: [
            '全部',
            '简历模板',
            '机构面试题',
            '算法介绍',
            '源码下载',
            '学习资料'
        ],
        resourcesList: [],
        dataSource: [],
        actice: 0,
        iconList: [
            'video',
            'folder-locked',
            'image'
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        request(url.getJavascriptResourcesList).then(res => {
            this.setData({resourcesList: res, dataSource: res})
        })
    },
    onChange (e) {
        this.setData({
            active: e.detail.value,
            resourcesList: e.detail.value ? this.data.dataSource.filter(data => data.category === e.detail.value) : this.data.dataSource
        })
    },
    onCopyLink (e) {
        const {item} = e.currentTarget.dataset
        wx.setClipboardData({
            data: item.copyUrl,
        })
    },
    onPasswordCopy (e) {
        const {item} = e.currentTarget.dataset
        wx.setClipboardData({
            data: item.password,
        })
    },
    onCheckFile (e) {
        const {item} = e.currentTarget.dataset
        wx.showLoading({
            title: '加载中...',
        })
        wx.downloadFile({
            url: item.downloadUrl,
            success (res) {
                if (res.statusCode === 200) {
                    wx.hideLoading()
                    Dialog.confirm({
                        content: '文件下载完成，是否要打开',
                    }).then(() => {
                        wx.openDocument({
                            filePath: res.tempFilePath
                        })
                    })
                }
            }
		})
	},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return {
            title: 'Ibadgers前端练功房--资源下载',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/javascriptpackage/pages/resources/resources'
        }
	},
	onShareTimeline () {
        return {
			title: 'Ibadgers前端练功房--资源下载',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png'
        }
    }
})