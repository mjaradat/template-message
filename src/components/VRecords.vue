<template>
  <div class="card">
    <div class="card-body">
      <!-- Title -->
      <label class="form-label mx-3">{{ label }}</label>

      <!-- Record List -->
      <div class="mb-3">
        <div v-for="(record, index) in records" :key="index" class="d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex align-items-center flex-fill border rounded tm-blue mx-3 py-3">
            <slot :record :index>{{ index }}</slot>
          </div>
          <a href="javascript:void(0)" class="text-decoration-none text-secondary" @click="removeRecord(index)"><i class="bi bi-trash3"></i></a>
        </div>
      </div>

      <!-- Add Record Input -->
      <div class="d-flex justify-content-center align-items-center">
        <a href="javascript:void(0)" class="text-decoration-none text-primary" :class="`text-${records.length < 2 ? 'primary' : 'muted pe-none'}`" @click="() => records.length < 2 && addRecord()">
          <i class="bi bi-plus"></i> {{ t('addNewButton') }}
        </a>
      </div>

      <!-- Validation Feedback -->
      <div v-if="validationState === ValidationStateEnum.invalid" class="invalid-feedback d-block mt-2">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { ValidationStateEnum } from '../models/enum/ValidationStateEnum'
import { t } from '../i18n/locales'

// Props
const props = defineProps<{
  modelValue: any[]
  record: { [key: string]: string }
  label?: string
  validationState?: ValidationStateEnum
  error?: string
}>()

// Emits
const emits = defineEmits<{
  (e: 'update:modelValue', value: any[]): void
}>()

const { modelValue, record } = toRefs(props)
// Internal State
const records = ref([...modelValue.value]) // Local copy of the records
const newRecord = ref({ ...record.value })

watch(
  () => modelValue.value,
  newVal => {
    records.value = [...newVal]
  }
)

// Add Record
const addRecord = () => {
  if (!newRecord.value) return
  records.value.push(newRecord.value)
  newRecord.value = { ...record.value }
  emits('update:modelValue', records.value)
}

// Remove Record
const removeRecord = (index: number) => {
  records.value.splice(index, 1)
  emits('update:modelValue', records.value)
}
</script>
