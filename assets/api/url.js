const url = __wxConfig.envVersion === 'develop' ? 'http://127.0.0.1:65110/' : 'https://leexiaop.github.io/static/'
export default {
    getMainList: url + 'mini/table/main.json',
    getSwiperList: url + 'mini/table/swiper.json',
    getResourcesList: url + 'mini/table/resources.json',
    getIbadgersList: url + 'mini/table/',
    getIbadgersDoc: url + 'mini/docs/'
}