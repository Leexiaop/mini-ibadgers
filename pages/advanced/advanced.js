// pages/advanced/advanced.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0
    },
    onChange (e) {
        this.setData({
            active: e.detail.name
        })
        wx.setNavigationBarTitle({
            title: !e.detail.name ? '进阶图普' : '复习纲要',
        })
    },
    onImageClick () {
        wx.previewImage({
            urls: [
                'https://leexiaop.github.io/static/mini/img/advanced_1.png',
                'https://leexiaop.github.io/static/mini/img/advanced_2.jpg'
            ]
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return {
            title: 'Ibadgers',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/page/advanced/advanced'
        }
    }
})