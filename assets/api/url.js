const url = __wxConfig.envVersion === 'develop' ? 'http://127.0.0.1:5500/' : 'https://leexiaop.github.io/static/'
// const url = 'https://leexiaop.github.io/static/'
export default {
	getNoticeContent: url + 'mini/table/notice.json',
    getMainList: url + 'mini/table/main.json',
    getSwiperList: url + 'mini/table/swiper.json',
    getResourcesList: url + 'mini/table/resources.json',
    getIbadgersList: url + 'mini/table/',
    getIbadgersDoc: url + 'mini/docs/',
	getCode: url + 'cases/threejs/',
	getMolarSwiperList: url + 'mini/molar/swiper.json',
	getMolarList: url + 'mini/molar/molar.json',
	getProvinceList: url + 'mini/molar/province.json',
	getProvinceMolarList: url + 'mini/molar/list.json'
}