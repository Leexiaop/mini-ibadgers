// javascript.js
// 获取应用实例
import request from '../../utils/request'
import url from '../../assets/api/url'
let interstitialAd = null;
const image = 'https://tdesign.gtimg.com/mobile/demos/example2.png';
const items = new Array(12).fill({ label: '标题文字', image }, 0, 12);
Page({
    offsetTopList: [],
    data: {
      sideBarIndex: 1,
      scrollTop: 0,
      categories: [],
      navbarHeight: 0,
    },
    // 事件处理函数

    onLoad() {
        request(url.getJavascriptData).then(res => {
            this.setData({categories: res})
            const query = wx.createSelectorQuery().in(this);
            const { sideBarIndex } = this.data;
            query.selectAll('.title').boundingClientRect();
            query.select('.custom-navbar').boundingClientRect();
            query.exec((res) => {
            const [rects, { height: navbarHeight }] = res;
            this.offsetTopList = rects.map((item) => item.top - navbarHeight);
                this.setData({ navbarHeight, scrollTop: this.offsetTopList[sideBarIndex] });
            });
        })
      },
    
      onSideBarChange(e) {
        const { value } = e.detail;
    
        this.setData({ sideBarIndex: value, scrollTop: this.offsetTopList[value] });
      },
      onScroll(e) {
        const { scrollTop } = e.detail;
        const threshold = 50; // 下一个标题与顶部的距离
    
        if (scrollTop < threshold) {
          this.setData({ sideBarIndex: 0 });
          return;
        }
    
        const index = this.offsetTopList.findIndex((top) => top > scrollTop && top - scrollTop <= threshold);
    
        if (index > -1) {
          this.setData({ sideBarIndex: index });
        }
      },
    onShareAppMessage () {
        return {
            title: 'Ibadgers前端练功房',
            imageUrl: 'https://leexiaop.github.io/static/ibadgers/logo.png',
            path: '/pages/javascript/javascript'
        }
    },
    onShareTimeline () {
        return {
            title: '代码改变世界，我删库跑路！'
        }
    }
})
