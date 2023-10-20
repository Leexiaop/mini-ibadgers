// app.js
import {getCach} from './utils/util'
App({
	onLaunch () {
		const userInfo = getCach('userInfo')
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
