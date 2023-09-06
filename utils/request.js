module.exports = (url) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            success: (res) => {
                if (res.statusCode === 200) {
                    resolve(res.data)
                } else {
                    wx.showToast({
                        icon: 'error',
                        title: '请求失败',
                    })
                }
            },
            fail: (err) => {
                reject(err)
                wx.showToast({
                    icon: 'error',
                    title: '请求失败',
                })
            }
        })
    })
}