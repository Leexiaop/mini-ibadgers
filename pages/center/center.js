// pages/center/center.js
import Dialog from '@vant/weapp/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        gender: 0
    },
    onLoad () {
        if (wx.getStorageSync('gender') === 0 || wx.getStorageSync('gender') === 1) {
            this.setData({gender: wx.getStorageSync('gender')})
        } else {
            let gender = Math.floor(Math.random() * 2)
            wx.setStorageSync('gender', gender)
            this.setData({gender: gender})
        }
        if (wx.getStorageSync('name')) {
            this.setData({name: wx.getStorageSync('name')})
        } else {
            let name = `Ibadgers_${Math.ceil(Math.random() * 100000000)}`
            wx.setStorageSync('name', name)
            this.setData({name: name})
        }
    },
    onCellClick (e) {
        const {type} = e.currentTarget.dataset
        switch (type) {
            case '3':
                Dialog.alert({
                    message: '感谢您对Ibadgers一直以来的关注，我们也将继续努力，致力于将不一样的前端知识分享给大家，祝愿每一位前端ibadger一切顺利！',
                    theme: 'round-button'
                  });
                break
            case '5':
                wx.navigateTo({
                    url: '/pages/resources/resources',
                })
                break
            case '6':
                wx.setClipboardData({
                    data: 'https://blog.csdn.net/leelxp'
                })
                break
            case '7':
                wx.setClipboardData({
                    data: 'https://Leexiaop.github.io'
                })
                break
            case '8':
                wx.setClipboardData({
                    data: 'https://Leexiaop.github.io/ibadgers'
                })
                break
            case '9':
                wx.setClipboardData({
                    data: 'https://github.com/Leexiaop'
                })
                break
            case '10':
                wx.previewImage({
                    urls: ['https://leexiaop.github.io/static/ibadgers/wechat.jpeg'],
                })
                break
            default:
                wx.showToast({
                    icon: 'none',
                    title: '功能暂未开放，敬请期待...',
                })
                console.log('hello ibadgers!')
        }
    }
})