import { createI18n } from 'vue-i18n'


import en from './locale/en.json'
import ko from './locale/ko.json'


export const i18n = createI18n({
	// something vue-i18n options here ...
	legacy: false, // you must set `false`, to use Composition API
	locale: 'ko', // set locale
	fallbackLocale: 'ko', // set fallback locale
	messages: {
		en, ko
	}
})