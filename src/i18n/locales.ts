import { reactive, computed } from 'vue'

// Translation messages
const messages = {
  en: {
    welcome: 'Welcome',
    greeting: 'Hello, {name}!'
  },
  ar: {
    welcome: 'مرحبًا',
    greeting: 'مرحبًا، {name}!'
  }
}

// Reactive state for locale
const state = reactive({
  currentLocale: 'en' as 'en' | 'ar', // Supported locales
  currentDir: 'ltr' // Default direction
})

// Set locale and direction
export const setLocale = (locale: 'en' | 'ar') => {
  state.currentLocale = locale
  state.currentDir = locale === 'ar' ? 'rtl' : 'ltr'
}

// Getters
export const getLocale = computed(() => state.currentLocale)
export const getDir = computed(() => state.currentDir)

// Translation function
export const t = (key: string, params?: Record<string, string | number>): string => {
  let translation = messages[state.currentLocale][key as keyof (typeof messages)['en']]

  if (!translation) {
    console.warn(`Translation for "${key}" not found`)
    return key // Return the key if translation is missing
  }

  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      translation = translation.replace(`{${paramKey}}`, String(paramValue))
    })
  }

  return translation
}
