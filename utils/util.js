module.exports = {
	getCach: (key) => {
		return wx.getStorageSync(key)
	},
	setCach: (key, data) => {
		wx.setStorageSync(key, data)
	},
	removeCach: (key) => {
		wx.removeStorageSync(key)
	}
}
