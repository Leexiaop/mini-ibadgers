// pages/resources/resources.js
import request from '../../utils/request'
import url from '../../assets/api/url'
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
        actice: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.init()
    },
    init() {
        request(url.getResourcesList).then(res => {
            console.log(res)
        })
    },
    onChange (e) {
        this.setData({
            active: e.detail.name
        })
        this.init()
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

    }
})