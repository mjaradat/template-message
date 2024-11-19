<template>
  <div class="mb-3">
    <!-- Label -->
    <label v-if="label" :for="id" class="form-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <!-- select -->
    <select :id="id" class="form-select" :class="validationClass" :value="modelValue" :placeholder="placeholder" @change="onChange">
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="item in items" :key="item.id" :value="item.value">
        {{ item.displayText }}
      </option>
    </select>

    <!-- validation -->
    <div v-if="validationState === ValidationStateEnum.invalid" class="invalid-feedback">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, toRefs } from 'vue'
import { ValidationStateEnum } from '../models/enum/ValidationStateEnum'

// Props
const props = defineProps<{
  id: string // Unique input ID
  label: string // Label for the select dropdown
  modelValue: string // Two-way binding value
  items: { value: string; displayText: string; id: number }[] // Dropdown items
  placeholder?: string // Placeholder text
  required?: boolean // If true, shows a red asterisk next to the label
  validationState?: ValidationStateEnum // Current validation state
  error?: string // Error message for invalid state
}>()

const { validationState } = toRefs(props)

// Emits
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// Computed property for dynamic validation class
const validationClass: ComputedRef<'is-invalid' | 'is-valid' | ''> = computed(() => {
  if (validationState.value === ValidationStateEnum.invalid) return 'is-invalid'
  if (validationState.value === ValidationStateEnum.valid) return 'is-valid'
  return ''
})

// Handle value change
const onChange = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>
