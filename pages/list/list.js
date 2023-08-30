// logs.js
const util = require('../../utils/util.js')

Page({
    data: {
        list: []
    },
    onLoad() {
        wx.request({
            url: 'https://leexiaop.github.io/static/resources/files.json',
            success: res => {
                let arr = []
                for (let key in res?.data) {
                    arr.push({name: key, children: res?.data[key]})
                }
                this.setData({list: arr})
            }
        })
    },
    onCellClick (e) {
        wx.navigateTo({
            url: `/pages/canvas/canvas?url=${e.currentTarget.dataset.cell}`,
        })
    },
    onShareAppMessage () {
        return {
            title: '3d World',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/world.png',
            path: '/page/list/list'
        }
    }
})
