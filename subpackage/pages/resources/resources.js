// pages/resources/resources.js
import request from '../../../utils/request'
import url from '../../../assets/api/url'
import Dialog from '@vant/weapp/dialog/dialog'
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
            'video-o',
            'description',
            'photo-o'
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        request(url.getResourcesList).then(res => {
            this.setData({resourcesList: res, dataSource: res})
        })
    },
    onChange (e) {
        this.setData({
            active: e.detail.name,
            resourcesList: e.detail.name ? this.data.dataSource.filter(data => data.category === e.detail.name) : this.data.dataSource
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
                        message: '文件下载完成，是否要打开',
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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return {
            title: 'Ibadgers',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            desc: 'dadafdafsdada',
            path: '/pages/resources/resources'
        }
    }
})