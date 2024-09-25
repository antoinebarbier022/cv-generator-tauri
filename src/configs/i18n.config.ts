import { Locale } from 'date-fns'
import { enUS, fr } from 'date-fns/locale'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

export const locales: Record<string, Locale> = {
  fr: fr,
  en: enUS
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)

  .init({
    fallbackLng: 'en',
    load: 'languageOnly',
    debug: false,

    ns: [],
    defaultNS: 'translation',

    interpolation: {
      escapeValue: false
    }
  })

export default i18n
