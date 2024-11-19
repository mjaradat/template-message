<template>
  <div>
    <v-image-uploader v-model="image" :max-file-size="500" />
    <div v-if="image" class="display-image">
      <h2>Selected Image</h2>
      <img :src="image" alt="Preview" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'

const image = ref<string>()

const VImageUploader = defineAsyncComponent(() => import('../components/VImageUploader.vue'))
</script>

<style scoped>
.display-image img {
  max-width: 300px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 20px;
}
</style>
