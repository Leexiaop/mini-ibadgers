// pages/advanced/advanced.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        advanceList: [
            {
                title: '进阶图谱',
                url: 'https://leexiaop.github.io/static/mini/img/advanced_1.png'
            },
            {
                title: '复习纲要',
                url: 'https://leexiaop.github.io/static/mini/img/advanced_2.png'
            },
            {
                title: '学习进行时',
                url: 'https://leexiaop.github.io/static/mini/img/advanced_3.png'
            }
        ],
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
            urls: this.data.advanceList.map(advance => advance.url)
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return {
            title: 'Ibadgers',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/pages/advanced/advanced'
        }
    }
})