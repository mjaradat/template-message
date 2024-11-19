<template>
  <div
    class="image-uploader rounded p-3 text-center"
    :class="{ 'border-primary': isDragging, 'border-danger': validationMessage || errorMessage }"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
    @click="() => modelValue && triggerFileInput()"
  >
    <input ref="fileInput" class="form-control d-none" type="file" accept="image/*" @change="onFileChange" />
    <div v-if="!modelValue" class="d-flex flex-column upload-instructions text-muted" style="cursor: pointer">
      <i class="bi bi-cloud-upload fs-1"></i>

      <h6>
        {{ t('dragDrop') }}
      </h6>
      <small class="text-muted mb-3">{{ t('allowedTypes') }} .jpeg, .jpg, .png</small>
      <button type="button" class="btn btn-outline-primary m-auto" @click="triggerFileInput">{{ t('selectFile') }}</button>
    </div>

    <div v-if="validationMessage || errorMessage" class="text-danger mt-2">
      {{ validationMessage || errorMessage }}
    </div>

    <div v-if="modelValue" class="image-preview mt-3">
      <img :src="modelValue" alt="Uploaded Image" class="img-fluid rounded" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, toRefs } from 'vue'
import { t } from '../i18n/locales'

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  maxFileSize: {
    type: Number,
    default: 2048 // 2MB
  },
  errorMessage: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])

const { maxFileSize } = toRefs(props)
const fileInput = ref<HTMLInputElement | null>(null)
const validationMessage = ref<string | null>(null)
const isDragging = ref(false)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  handleFile(file)
}

const onDragOver = () => {
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
  const file = event.dataTransfer?.files[0]
  handleFile(file)
}

const handleFile = (file: File | undefined) => {
  if (!file) return
  if (!validateFile(file)) {
    emit('update:modelValue', null)
    return
  }

  const reader = new FileReader()
  reader.onload = e => {
    emit('update:modelValue', e.target?.result as string)
  }
  reader.readAsDataURL(file)
}

const validateFile = (file: File) => {
  if (file.size > maxFileSize.value * 1024) {
    validationMessage.value = t('fileSize', { key: maxFileSize.value })
    return false
  }
  if (!file.type.startsWith('image/')) {
    validationMessage.value = t('onlyImage')
    return false
  }
  validationMessage.value = null
  return true
}
</script>

<style scoped>
.image-uploader {
  display: flex;
  border: 1px dashed #00000025;
  min-height: 150px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: border-color 0.3s ease-in-out;
  cursor: pointer;
}

.image-uploader.border-primary {
  border-width: 3px;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
}
</style>
