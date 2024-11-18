<template>
  <div>
    <v-radio-buttons v-model="selectedCategory" :items="radioItems" :validationState="validationState" :error="errorMessage" :successMessage="successMessage" name="categorySelection" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { ValidationStateEnum } from '../models/enum/ValidationStateEnum'

const selectedCategory = ref<string>('') // Selected category value

const validationState = ref<ValidationStateEnum>(ValidationStateEnum.none)
const errorMessage = ref('Please select a category.')
const successMessage = ref('Selection is valid.')

const radioItems = [
  {
    value: '',
    displayText: 'None',
    icon: '',
    id: 0
  },
  {
    value: 'TEXT',
    displayText: 'Text',
    icon: 'bi bi-list',
    id: 1
  },
  {
    value: 'IMAGE',
    displayText: 'Image',
    icon: 'bi bi-card-image',
    id: 2
  }
]
const VRadioButtons = defineAsyncComponent(() => import('../components/VRadioButtons.vue'))
</script>
