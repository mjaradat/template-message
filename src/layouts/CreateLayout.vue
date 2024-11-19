<template>
  <div class="container-fluid mb-5 pb-5">
    <!-- header -->
    <div class="row mb-4">
      <div class="col-12">
        <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb ">
          <ol class="breadcrumb">
            <li class="breadcrumb-item text-muted">{{ t('templatesTitle') }}</li>
            <li class="breadcrumb-item active text-black" aria-current="page">{{ t('newTemplateMessage') }}</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row">
      <!-- form -->
      <div class="col-9">
        <template-message-form :model-value="templateMessage" ref="formRef" />
      </div>
      <!-- preview -->
      <div class="col-3">
        <v-preview class="position-sticky mx-auto" style="top: 3rem" :message="templateMessage" />
      </div>
    </div>
    <!-- footer -->
    <div class="row">
      <div class="col-12">
        <button class="btn text-white tm-purple-solid mx-auto" @click="formRef.validate()">
          <i class="bi bi-floppy"></i>
          {{ t('save') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { TemplateMessage } from '../models/class/template-message'
import { MessageHeader } from '../models/class/header'
import { MessageBody } from '../models/class/body'
import { MessageFooter } from '../models/class/footer'
import { MessageButtons } from '../models/class/buttons'
import { t } from '../i18n/locales'

const templateMessage = ref(new TemplateMessage())
const formRef = ref()
templateMessage.value.components.push(new MessageHeader())
templateMessage.value.components.push(new MessageBody())
templateMessage.value.components.push(new MessageFooter())
templateMessage.value.components.push(new MessageButtons())

const TemplateMessageForm = defineAsyncComponent(() => import('../forms/TemplateMessageForm.vue'))
const VPreview = defineAsyncComponent(() => import('../components/VPreview.vue'))
</script>

<style scoped>
/* Optional custom styling */
</style>
