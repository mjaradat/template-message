<template>
  <div>
    <v-visual-select v-model="selectedCategory" :categories="categories" :validationState="validationState" :error="error" />
    <br />
    <button class="btn btn-primary mt-2" @click="toggleValidationState">Toggle Validation State</button>
    <p>Current State: {{ validationState }}</p>
    {{ selectedCategory }}
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, watch } from 'vue'
import { MessageCategoryEnum } from '../models/enum/MessageCategoryEnum'
import { ValidationStateEnum } from '../models/enum/ValidationStateEnum'

const selectedCategory = ref(MessageCategoryEnum.none) // Default value

const validationState = ref<ValidationStateEnum>(ValidationStateEnum.none)
const error = ref('Please select a category.')

const categories = [
  {
    value: MessageCategoryEnum.marketing,
    name: 'Marketing',
    description: 'Promotions, ads, campaigns.',
    icon: 'bi bi-megaphone',
    id: 1,
    selectedColor: 'var(--tm-purple)'
  },
  {
    value: MessageCategoryEnum.utility,
    name: 'Utility',
    description: 'Tools, utilities, services.',
    icon: 'bi bi-bell',
    id: 2,
    selectedColor: 'var(--tm-blue)'
  }
]

const toggleValidationState = () => {
  validationState.value = validationState.value === ValidationStateEnum.invalid ? ValidationStateEnum.valid : ValidationStateEnum.invalid
}

watch(
  () => selectedCategory.value,
  _to => {
    validationState.value = ValidationStateEnum.none
  }
)

const VVisualSelect = defineAsyncComponent(() => import('../components/VVisualSelect.vue'))
</script>
