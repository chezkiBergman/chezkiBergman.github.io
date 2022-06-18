
// import Backend from 'i18next-http-backend'
// import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import i18n from "i18next"
import translationEn from "./component/translations.Json/i18n.translations.en.json"
import translationHe from "./component/translations.Json/i18n.translations.he.json"

i18n.use(initReactI18next).init({
  fallbackLng: 'he',
  debug: true,
  resources:{
      en:{
        translation: translationEn
      },
       he: {
     translation: translationHe,
       }
  },
  detection: {
    order: ['queryString', 'cookie'],
    cache: ['cookie']
  },
  interpolation: {
    escapeValue: false
  }
})

export default i18n