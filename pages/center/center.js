// pages/center/center.js
import Dialog from 'tdesign-miniprogram/dialog/index';
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
		userInfo: app.globalData.userInfo,
        show: false
    },
	closeDialog () {
		this.setData({show: false})
	},
    onCellClick (e) {
        const {type} = e.currentTarget.dataset
        switch (type) {
            case '1':
                Dialog.confirm({
					closeBtn: true,
					context: this,
					content: '感谢您对Ibadgers一直以来的关注，同时也感谢尚硅谷，千峰教育等博主，正式因为拔了你们的内容，才使得本小程序如此的有吸引力，我们也将继续努力，致力于将不一样的前端知识分享给大家，祝愿每一位前端ibadger一切顺利！'
                });
                break
            case '2':
                this.setData({show: true})
                break
            case '3':
                wx.navigateTo({
                    url: '/subpackage/pages/resources/resources',
                })
                break
            case '4':
                wx.setClipboardData({
                    data: 'https://blog.csdn.net/leelxp'
                })
                break
            case '5':
                wx.setClipboardData({
                    data: 'https://Leexiaop.github.io'
                })
                break
            case '6':
                wx.setClipboardData({
                    data: 'https://Leexiaop.github.io/ibadgers'
                })
                break
            case '7':
                wx.setClipboardData({
                    data: 'https://github.com/Leexiaop'
                })
                break
            case '8':
                wx.previewImage({
                    urls: ['https://leexiaop.github.io/static/ibadgers/wechat.jpeg'],
                })
				break
			case '9':
				wx.navigateTo({
				  url: '/molarpackage/pages/index/index',
				})
				break
            default:
                wx.showToast({
                    icon: 'none',
                    title: '功能暂未开放，敬请期待...',
                })
                console.log('hello ibadgers!')
        }
	},
	  onShareAppMessage() {
        return {
            title: 'Ibadgers',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/pages/center/center'
        }
    },
    onShareTimeline () {
        return {
            title: '代码敲了那么久，总觉得还有一行还不是最优秀...'
        }
    }
})