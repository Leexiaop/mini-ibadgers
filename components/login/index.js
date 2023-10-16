// components/login/login.js
import {setCach, removeCach} from '../../utils/util'
const app = getApp()
Component({

    /**
     * 组件的属性列表
     */
    properties: {
		show: {
			type: Boolean,
			default: true
		}
	},

    /**
     * 组件的初始数据
     */
    data: {
		canIUseGetUserProfile: false
	},
	lifetimes: {
		attached() {
			if (wx.getUserProfile) {
				this.setData({canIUseGetUserProfile: true})
			}
		}
	},

    /**
     * 组件的方法列表
     */
    methods: {
		onRufuse () {
			app.globalData.hasUserInfo = false
			app.globalData.userInfo = null
			removeCach('userInfo')
			this.triggerEvent('onComplate', {type: 'fail', value: false})
		},
		getUserProfile(e) {
			wx.getUserProfile({
				desc: '用于完善会员资料',
				success: (res) => {
					setCach('userInfo', res.userInfo)
					app.globalData.hasUserInfo = true
					app.globalData.userInfo = res.userInfo
					this.triggerEvent('onComplate', {type: 'success', value: false})
				},
				fail: () => {
					removeCach('userInfo')
					app.globalData.hasUserInfo = false
					app.globalData.userInfo = null
					this.triggerEvent('onComplate', {type: 'fail', value: false})
				}
			})
		},
		getUserInfo(e) {
			setCach('userInfo', e.detail.userInfo)
			app.globalData.hasUserInfo = true
			app.globalData.userInfo = e.detail.userInfo
			this.triggerEvent('onCompalte', {type: 'fail', value: false})
		},
    }
})