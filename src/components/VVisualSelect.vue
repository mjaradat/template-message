<template>
  <div class="category-selection">
    <!-- Render categories dynamically from the prop -->
    <div
      v-for="category in categories"
      :key="category.id"
      class="category-item mb-3"
      :class="{
        selected: selectedCategory === category.value,
        'is-invalid': validationState === 'invalid',
        'is-valid': validationState === 'valid'
      }"
      @click="selectCategory(category.value)"
      :style="{ backgroundColor: selectedCategory === category.value ? category.selectedColor : '' }"
    >
      <!-- Category Icon -->
      <div class="category-icon">
        <i :class="category.icon"></i>
      </div>

      <!-- Category Text -->
      <div class="category-text">
        <h5>{{ category.name }}</h5>
        <small>{{ category.description }}</small>
      </div>
    </div>

    <!-- Validation Feedback -->
    <div v-if="validationState === ValidationStateEnum.invalid" class="invalid-feedback">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { MessageCategoryEnum } from '../models/enum/MessageCategoryEnum'
import { ValidationStateEnum } from '../models/enum/ValidationStateEnum'

// Props
const props = defineProps<{
  modelValue: MessageCategoryEnum
  categories: {
    value: string
    name: string
    description: string
    icon: string
    id: number
    selectedColor: string
  }[]
  validationState: ValidationStateEnum // Validation state for the selection
  error?: string // Error message for invalid state
}>()

// emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// refs
const { modelValue, validationState } = toRefs(props)
const selectedCategory = ref<string>(modelValue.value)

// methods
const selectCategory = (categoryValue: string) => {
  selectedCategory.value = categoryValue
}

// watchers
watch(selectedCategory, newValue => {
  emit('update:modelValue', newValue)
})
</script>

<style scoped>
.category-selection {
  display: flex;
  flex-direction: column;
}

.category-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-item:hover {
  transform: scale(1.02);
}

.category-item.selected {
  border-color: var(--bs-black);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.category-item.is-valid {
  border-color: var(--bs-success);
}

.category-item.is-invalid {
  border-color: var(--bs-danger);
}

.category-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem; /* Space between icon and text */
  font-size: 1.2rem; /* Adjust icon size */
}

[dir='rtl'] .category-icon {
  margin-right: unset;
  margin-left: 1rem;
}

.category-text {
  flex-grow: 1;
}

.category-text h5 {
  margin: 0;
  font-size: 1.1rem;
}

.category-text small {
  color: #888;
}
</style>
