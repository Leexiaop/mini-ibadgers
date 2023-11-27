// app.js
import {getCach} from './utils/util'
import './utils/lodash-fix'
import _ from './utils/lodash.min'
App({
	onLaunch () {
		wx._ = _;
		// const userInfo = getCach('userInfo')
		// if(userInfo) {
		// 	this.globalData.userInfo = userInfo
		// 	this.globalData.hasUserInfo = true
		// 	return
		// }
		// wx.navigateTo({
		//   	url: '/pages/login/login',
		// })
	},
	globalData: {
		userInfo: null,
		hasUserInfo: false
	}
})
