import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhjs from './zh'
import enjs from './en'
import twjs from './tw'
import ElLocale from 'element-ui/lib/locale'
import Elen from 'element-ui/lib/locale/lang/en'
import Eltw from 'element-ui/lib/locale/lang/zh-TW'
import Elzh from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n)
const DEFAULT_LANG = 'zh'
const LOCALE_KEY = 'localeLanguage'

const locales = {
  zh: zhjs,
  en: enjs,
  tw: twjs
}
const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales,
})

const uilocales = {
  zh: Elzh,
  en: Elen,
  tw: Eltw
}

const setUilocales = lang => {
  switch (lang) {
    case 'zh': return uilocales.zh
    case 'en': return uilocales.en
    case 'tw': return uilocales.tw
  }
}
//这里我们抛出一个setup方法，用来修改我们的语言；
//并且在这个方法中，我们把用户选择的语言存储在localStorage里面，方便用户下次进入是直接使用上次选择的语言
//因为语言的不同，可能我们页面上的样式也会有相应的调整，所以这里在body上加入了相应的类名，方便我们做样式定制
export const setup = lang => {
  if (lang === undefined) {
    lang = window.localStorage.getItem(LOCALE_KEY)
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  window.localStorage.setItem(LOCALE_KEY, lang)
  
  Object.keys(locales).forEach(lang => {
    document.body.classList.remove(`lang-${lang}`)
  })
  document.body.classList.add(`lang-${lang}`)
  document.body.setAttribute('lang', lang)
//把当前语言设置到vue的配置里面，方便在代码中读取
  Vue.config.lang = lang
  i18n.locale = lang
  ElLocale.use(setUilocales(lang))
}
//设置默认语言为中文
setup(window.sessionStorage.getItem('lang') || 'zh')
//把i18n绑定到window上，方便我们在vue以外的文件使用语言包
window.i18n = i18n;
export default i18n