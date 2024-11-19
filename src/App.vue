<template>
  <div>
    <div class="container">
      <!-- <p>{{ translate('welcome') }}</p>
      <p>{{ translate('greeting', { name: 'Ahmed' }) }}</p> -->
      <button class="btn btn-primary" @click="switchLocale('en')">English</button>
      <button class="btn btn-secondary" @click="switchLocale('ar')">العربية</button>
    </div>
  </div>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { setLocale, getDir, t } from './i18n/locales'

// Translate function
const translate = (key: string, params?: Record<string, string | number>) => t(key, params)

// Switch locale function
const switchLocale = (locale: 'en' | 'ar') => {
  setLocale(locale)
}

// Watch for changes in direction and update the document's `dir` attribute
watch(getDir, newDir => {
  document.documentElement.setAttribute('dir', newDir)
})
</script>
