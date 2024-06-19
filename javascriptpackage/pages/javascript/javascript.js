// javascript.js
// 获取应用实例
import request from "../../../utils/request";
import url from "../../../assets/api/url";
let interstitialAd = null;
const image = "https://tdesign.gtimg.com/mobile/demos/example2.png";
const items = new Array(12).fill({ label: "标题文字", image }, 0, 12);
Page({
	data: {
		tabList: [],
		list: [],
	},
	onLoad() {
		request(url.getJavascriptData).then((res) => {
			let arr = [];
			res.forEach((element) => {
				arr = arr.concat(element.items);
			});
			res.unshift({ label: "全部", items: arr });
			this.setData({ tabList: res, list: res[0]?.items });
		});
	},
	onTabsClick(e) {
		const { value } = e.detail;
		this.setData({ list: this.data.tabList[value - 1]?.items });
	},
	onShareAppMessage() {
		return {
			title: "Ibadgers前端练功房",
			imageUrl: "https://leexiaop.github.io/static/ibadgers/logo.png",
			path: "/pages/javascript/javascript",
		};
	},
	onShareTimeline() {
		return {
			title: "代码改变世界，我删库跑路！",
		};
	},
});
