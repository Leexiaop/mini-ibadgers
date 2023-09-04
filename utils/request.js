module.exports = (url) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            success: (res) => {
                if (res.statusCode === 200) {
                    wx.showToast({
                        icon: 'none',
                        title: res.errMsg,
                    })
                    resolve(res.data)
                } else {
                    wx.showToast({
                        icon: 'error',
                        title: res.errMsg,
                    })
                }
            },
            fail: (err) => {
                reject(err)
                wx.showToast({
                    icon: 'error',
                    title: res.errMsg,
                })
            }
        })
    })
}