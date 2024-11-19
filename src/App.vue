<template>
  <div class="container-fluid mb-3">
    <div class="row bg-white py-3">
      <div class="col-10 d-flex align-items-center">
        <i class="bi bi-plus-lg fs-4 text-black"></i>
        <h4 class="mx-3">{{ t('newTemplateMessage') }}</h4>
      </div>

      <div class="col-2 d-flex align-items-center justify-content-end">
        <a href="javascript:void(0)" class="text-primary text-decoration-none d-ltr-none mx-3" @click="switchLocale('en')">
          <b> English </b>
        </a>
        <a href="javascript:void(0)" class="text-primary text-decoration-none d-rtl-none mx-3" @click="switchLocale('ar')">
          <b> العربية </b>
        </a>
        <div>
          <button class="btn text-white tm-purple-solid mx-auto">
            <i class="bi bi-floppy"></i>
            {{ t('save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { setLocale, getDir, t } from './i18n/locales'

// Switch locale function
const switchLocale = (locale: 'en' | 'ar') => {
  setLocale(locale)
}

// Watch for changes in direction and update the document's `dir` attribute
watch(getDir, newDir => {
  document.documentElement.setAttribute('dir', newDir)
})
</script>
