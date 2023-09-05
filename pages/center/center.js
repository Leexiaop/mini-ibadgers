// pages/center/center.js
import request from '../../utils/request'
import url from '../../assets/api/url'
import Dialog from '@vant/weapp/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [],
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
        request(url.getSwiperList).then(res => {
            this.setData({swiperList: res})
        })
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
                console.log('hello ibadgers!')
        }
    }
})