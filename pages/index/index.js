// pages/index/index.js
import request from "../../utils/request";
import url from "../../assets/api/url";
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		navList: [],
		list: [],
		navigation: { type: "dots-bar" },
		loading: true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {
		wx.showLoading({
			title: "加载中...",
		});
		this.setData({ loading: true });
		request(url.getHomeData).then((res) => {
			this.setData({
				navList: res?.swiperList,
				list: res?.list,
				loading: false,
			});
			wx.hideLoading();
		});
	},
	onTipClick(e) {
		const { index } = e.currentTarget.dataset;
		switch (index) {
			case 0:
			case 1:
				wx.navigateTo({
					url: `/javascriptpackage/pages/advanced/advanced?idx=${index}`,
				});
				break;
			case 2:
				wx.navigateTo({
					url: "/javascriptpackage/pages/javascript/javascript",
				});
				break;
			case 3:
				wx.navigateTo({
					url: `/javascriptpackage/pages/list/list?url=company&&title=企业真题`,
				});
				break;
			case 4:
				wx.navigateTo({
					url: `/javascriptpackage/pages/resources/resources`,
				});
		}
	},
	onCellClick(e) {
		const { item } = e.currentTarget.dataset;
		if (item.disabled) {
			wx.showToast({
				icon: "none",
				title: "正在建设中，敬请期待...",
			});
			return;
		}
		wx.navigateTo({
			url: `/javascriptpackage/pages/list/list?url=${item.url}&&title=${item.title}`,
		});
	},
	onShareAppMessage() {
		return {
			title: "Ibadgers前端练功房",
			imageUrl: "https://leexiaop.github.io/static/ibadgers/logo.png",
			path: "/pages/index/index",
		};
	},
	onShareTimeline() {
		return {
			title: "代码改变世界，我删库跑路！",
		};
	},
});
