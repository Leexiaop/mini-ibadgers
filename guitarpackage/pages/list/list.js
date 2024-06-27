// guitarpackage/pages/list/list.js
import url from "../../../assets/api/url";
import request from "../../../utils/request";
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		list: [],
		copyList: [],
		isAuthor: false,
		authorInfo: null,
		active: 1,
		loading: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		wx.showLoading({
			title: "加载中...",
		});
		this.setData({ loading: true });
		request(url.getGuitarSongCellList).then((res) => {
			console.log(res);
			if (!options.author) {
				const data = wx._.cloneDeep(res);
				this.setData({
					isAuthor: false,
					list: res.filter((item) => item.type === this.data.active),
					copyList: data,
					loading: false,
				});
			} else {
				const data = res.filter(
					(item) => item.author === options.author
				);
				this.setData({
					isAuthor: true,
					list: data,
					authorInfo: data[0],
					loading: false,
				});
			}
			wx.hideLoading();
		});
	},
	onTabClick(e) {
		this.setData({
			active: e.currentTarget.dataset.tab,
			list: this.data.copyList.filter(
				(item) => item.type === e.currentTarget.dataset.tab
			),
		});
	},

	onCellClick(e) {
		const { name, type, classify } = e.currentTarget.dataset.item;
		wx.navigateTo({
			url: `/guitarpackage/pages/songs/songs?name=${name}&&type=${type}&&classify=${classify}`,
		});
	},
	onInputChange(e) {
		const { value } = e.detail;
		if (value) {
			const list = this.data.copyList.filter(
				(item) =>
					item.type === this.data.active &&
					(item.name.indexOf(value) > -1 ||
						item.author.indexOf(value) > -1)
			);
			this.setData({ list });
		} else {
			this.setData({
				list: this.data.copyList.filter(
					(item) => item.type === this.data.active
				),
			});
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {
		return {
			title: this.data.isAuthor
				? this.data.authorInfo.author
				: "民谣小馆",
			imageUrl: "http://127.0.0.1:5500/mini/img/guitar/mingyao.jpg",
			path: "/pages/guitar/guitar",
		};
	},
	onShareTimeline() {
		return {
			title: this.data.isAuthor
				? this.data.authorInfo.author
				: "你是我患得患失的梦我是你可有可无的人！",
			imageUrl: "http://127.0.0.1:5500/mini/img/guitar/mingyao.jpg",
		};
	},
});
