import { reactive, computed } from 'vue'
import { en } from './en'
import { ar } from './ar'

const messages = {
  en,
  ar
}

const state = reactive({
  currentLocale: 'en' as 'en' | 'ar',
  currentDir: 'ltr'
})

export const setLocale = (locale: 'en' | 'ar') => {
  state.currentLocale = locale
  state.currentDir = locale === 'ar' ? 'rtl' : 'ltr'
}

export const getLocale = computed(() => state.currentLocale)
export const getDir = computed(() => state.currentDir)

export const t = (key: string, params?: Record<string, string | number>): string => {
  let translation = messages[state.currentLocale][key as keyof (typeof messages)['en']]

  if (!translation) {
    console.warn(`Translation for "${key}" not found`)
    return key
  }

  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      translation = translation.replace(`{${paramKey}}`, String(paramValue))
    })
  }

  return translation
}
