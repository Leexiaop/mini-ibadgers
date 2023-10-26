const url = __wxConfig.envVersion === 'develop' ? 'http://127.0.0.1:5500/' : 'https://leexiaop.github.io/static/'
// const url = 'https://leexiaop.github.io/static/'
export default {
	getIndexList: url + 'mini/db/index.json',
	getJavascriptList: url + 'mini/db/javascript/index.json',
    getJavascriptSwiperList: url + 'mini/db/javascript/swiper.json',
	getJavascriptNoticeList: url + 'mini/db/javascript/notice.json',
	getJavascriptResourcesList: url + 'mini/db/javascript/resources.json',
	getJavascriptItemList: url + 'mini/db/javascript/',
	getJavascriptDocList: url + 'mini/docs/',
	getGuitarList: url + 'mini/db/guitar/index.json',
	getGuitarSongList: url + 'mini/db/guitar/list.json',
	getShopSwiperList: url + 'mini/db/shop/swiper.json',
	getShopList: url + 'mini/db/shop/index.json',
	getProvinceList: url + 'mini/db/shop/province.json',
	getProvinceShopList: url + 'mini/db/shop/list.json'
}