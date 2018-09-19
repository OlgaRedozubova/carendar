import I18n from 'i18n-js';
import {languages} from './constants';

I18n.defaultLocale = 'en';

I18n.translations = {
    en: require('../locales/en.js').default,
    ru: require('../locales/ru.js').default
};
I18n.fallbacks = true;

export const getBrowserlang = () => {
    let lang = languages.filter((languages) => {
        return languages.code === navigator.language.toLowerCase().substr(0,2);
    });

    if (lang.length > 0) {
        return lang[0].code
    } else {
        return 'en'
    }
};


const lang = localStorage.getItem('user_choice_lang') || localStorage.getItem('@starling:lang') || getBrowserlang();
if (lang !== I18n.locale)
    onChangeLang(lang);


export function onChangeLang(lang) {
    localStorage.setItem('@starling:lang', lang);
    I18n.locale = lang;
}



const i18n = I18n;

export default i18n;
