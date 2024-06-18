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
		noticeList: [],
		navigation: { type: "dots-bar" },
		loading: true,
		rowCol1: [{ width: "100%", height: "480rpx", borderRadius: "16rpx" }],
		rowCol2: [{ width: "120rpx", height: "90rpx", borderRadius: "16rpx" }],
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
				noticeList: res?.noticeList,
				loading: false,
			});
			wx.hideLoading();
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
