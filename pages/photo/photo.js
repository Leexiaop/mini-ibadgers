// pages/photo/photo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataInfo: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    },
    onPhotoAdd () {
        const self = this
        wx.chooseMedia({
            count: 1,
            mediaType: ['image','video'],
            sourceType: ['album', 'camera'],
            maxDuration: 30,
            camera: 'back',
            success(res) {
                console.log(res)
                if (res.errMsg === "chooseMedia:ok") {
                    wx.showToast({
                        icon: 'none',
                        title: '上传成功',
                    })
                    console.log(res.tempFiles)
                    console.log({type: res.type, source: res.tempFiles[0]})
                    self.setData({type: res.type, source: res.tempFiles[0]})
                }
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})