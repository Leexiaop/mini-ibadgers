// pages/login/login.js
import {setCach, removeCach} from '../../utils/util'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
		canIUseGetUserProfile: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
		wx.hideHomeButton();
		if (wx.getUserProfile) {
			this.setData({canIUseGetUserProfile: true})
		}
	},
	onShow() {
		wx.hideHomeButton();
	},
	getUserProfile(e) {
		wx.getUserProfile({
			desc: '用于完善会员资料',
			success: (res) => {
				setCach('userInfo', res.userInfo)
				app.globalData.hasUserInfo = true
				app.globalData.userInfo = res.userInfo
				wx.navigateBack()
			},
			fail: () => {
				removeCach('userInfo')
				app.globalData.hasUserInfo = false
				app.globalData.userInfo = null
			}
		})
	},
	getUserInfo(e) {
		setCach('userInfo', e.detail.userInfo)
		app.globalData.hasUserInfo = true
		app.globalData.userInfo = e.detail.userInfo
	}
})