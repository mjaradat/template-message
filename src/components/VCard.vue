<template>
  <div>
    <h6>{{ title }}</h6>
    <p>{{ subTitle }}</p>
  </div>
  <div class="card mb-3" v-bind="$attrs">
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="class-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subTitle: string
}>()
</script>

<style scoped>
/* Optional custom styling */
</style>
