// index.js
// 获取应用实例
Page({
    data: {
        motto: 'Welcome to the Ibadgers',
        userInfo: {},
        hasUserInfo: false
    },
    // 事件处理函数
    bindViewTap() {
        if (!this.data.hasUserInfo) {
            wx.showToast({
                icon: 'none',
                title: '请点击上方图标授权信息！'
            })
            return
        }
        wx.navigateTo({
            url: '/pages/list/list'
        })
    },
    onLoad() {
        const userInfo = wx.getStorageSync('userInfo')
        console.log(userInfo, 543223)
        if (userInfo) {
            this.setData({
                hasUserInfo: true,
                userInfo
            })
        }
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '获取你的昵称、头像、地区及性别', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                wx.setStorageSync('userInfo', res.userInfo)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
    },
    onShareAppMessage () {
        return {
            title: 'Ibadgers',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/world.png',
            path: '/page/index/index'
        }
    }
})
