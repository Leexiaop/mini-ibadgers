const baseUrl =
	__wxConfig.envVersion !== "develop"
		? "http://127.0.0.1:5500/"
        : "https://leexiaop.github.io/";

module.exports = (url) => {
	if (__wxConfig.envVersion !== "develop" && url.indexOf("mini/") !== -1) {
		url = url.replace(/mini\//g, "");
	}
	return new Promise((resolve, reject) => {
		wx.request({
			url: baseUrl + url,
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.data);
				} else {
					wx.showToast({
						icon: "error",
						title: "请求失败",
					});
				}
			},
			fail: (err) => {
				reject(err);
				wx.showToast({
					icon: "error",
					title: "请求失败",
				});
			},
		});
	});
};
