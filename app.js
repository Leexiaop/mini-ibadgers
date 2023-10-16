// app.js
import {getCach} from './utils/util'
import Dialog from 'tdesign-miniprogram/dialog/index'
App({
	onLaunch () {
		const userInfo = getCach('userInfo')
		console.log(userInfo)
		if(userInfo) {
			this.globalData.userInfo = userInfo
			this.globalData.hasUserInfo = true
			return
		}
		wx.navigateTo({
		  	url: '/pages/login/login',
		})
	},
	globalData: {
		userInfo: null,
		hasUserInfo: false
	}
})
