import Vue from 'vue'
import VueI18n from 'vue-i18n'
import * as vn from '@/assets/i18n/vn.json'
import * as en from '@/assets/i18n/en.json'

Vue.use(VueI18n)

function findLang() {
    return (window.navigator.language === 'vn') ? 'vn' : 'en';
}

export default new VueI18n({
    locale: findLang(),
    fallbackLocale: 'vn',
    messages: {
        ja: JSON.parse(JSON.stringify(vn)).default,
        en: JSON.parse(JSON.stringify(en)).default
    }
});
