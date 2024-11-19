<template>
  <div class="mb-3">
    <label v-if="label" :for="id" class="form-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <component
      class="form-control"
      :id
      :class="validationClass"
      :value="modelValue"
      :placeholder="placeholder"
      :type="multiline ? undefined : type"
      :rows="multiline ? rows || 3 : undefined"
      :is="multiline ? 'textarea' : 'input'"
      maxlength="256"
      @input="onInput"
    ></component>

    <div v-if="validationState === ValidationStateEnum.invalid" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, toRefs } from 'vue'
import { ValidationStateEnum } from '../models/enum/ValidationStateEnum'

// Props
const props = defineProps<{
  id: string
  label: string
  type?: string
  placeholder?: string
  modelValue: string
  required?: boolean // true means shows a red asterisk next to the label
  validationState?: ValidationStateEnum
  error?: string // error message
  multiline?: boolean // used for textarea
  rows?: number // used for textarea
}>()

const { validationState } = toRefs(props)

// emits
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// computed property for dynamic validation class
const validationClass: ComputedRef<'is-invalid' | 'is-valid' | ''> = computed(() => {
  if (validationState.value === ValidationStateEnum.invalid) return 'is-invalid'
  if (validationState.value === ValidationStateEnum.valid) return 'is-valid'
  return ''
})

const onInput = (e: Event) => {
  emits('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
