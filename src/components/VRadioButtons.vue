<template>
  <div class="form-actions tm-blue d-inline-flex align-items-center flex-wrap rounded p-1">
    <div v-for="item in items" :key="`${name}-${item.id}`" class="form-actions-justified mx-1" :class="{ 'bg-white': modelValue == item.value, validationClass }">
      <input v-model="modelValue" type="radio" class="btn-check" :id="`${name}-${item.id}`" :value="item.value" :name="name" :disabled="disabled" />
      <label class="d-flex align-items-center btn btn-sm border-0" :for="`${name}-${item.id}`">
        <i v-if="item.icon" class="fs-6" :class="item.icon"></i>
        <span class="px-2">
          {{ item.displayText }}
        </span>
      </label>
    </div>

    <div v-if="validationState === ValidationStateEnum.invalid" class="invalid-feedback">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch, toRefs } from 'vue'
import { ValidationStateEnum } from '../models/enum/ValidationStateEnum'
import { TItem } from '../models/type/t-items'

// Props
const props = defineProps<{
  items: TItem[]
  validationState?: ValidationStateEnum
  name: string
  error?: string
  disabled?: boolean
}>()

// Two-way binding (v-model equivalent)
const { validationState } = toRefs(props)

const modelValue = ref<string>(props.items[0]?.value || '')

// Computed for validation state class
const validationClass = computed(() => {
  return validationState.value === 'invalid' ? 'is-invalid' : validationState.value === 'valid' ? 'is-valid' : ''
})

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// Watch for changes to modelValue
watch(modelValue, newValue => {
  emit('update:modelValue', newValue) // Emit the selected value to parent component
})
</script>
