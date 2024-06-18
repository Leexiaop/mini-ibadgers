// const url = __wxConfig.envVersion === 'develop' ? 'http://127.0.0.1:5500/' : 'https://leexiaop.github.io/static/'
// const url = 'https://leexiaop.github.io/static/'
const url = "http://127.0.0.1:5500/";
export default {
    getHomeData: url + "database/home.json",
    getJavascriptData: url + "database/javascript.json"
	// getIndexList: url + 'mini/db/index.json',
	// getJavascriptList: url + 'mini/db/javascript/index.json',
	// getJavascriptSwiperList: url + 'mini/db/javascript/swiper.json',
	// getJavascriptNoticeList: url + 'mini/db/javascript/notice.json',
	// getJavascriptResourcesList: url + 'mini/db/javascript/resources.json',
	// getJavascriptItemList: url + 'mini/db/javascript/',
	// getJavascriptDocList: url + 'mini/docs/',
	// getJavascriptAdvanceList: url + 'mini/db/javascript/advance.json',
	// getGuitarList: url + 'mini/db/guitar/index.json',
	// getGuitarSongCellList: url + 'mini/db/guitar/list.json',
	// getGuitarSongList: url + 'mini/db/guitar/songs.json',
	// getShopList: url + 'mini/db/shop/index.json',
	// getProvinceList: url + 'mini/db/shop/province.json',
	// getProvinceShopList: url + 'mini/db/shop/list.json'
};
