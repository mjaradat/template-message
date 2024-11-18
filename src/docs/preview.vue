<template>
  <v-preview />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const VPreview = defineAsyncComponent(() => import('../components/VPreview.vue'))
</script>
