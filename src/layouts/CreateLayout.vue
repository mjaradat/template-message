<template>
  <div class="container-fluid">
    <!-- header -->
    <div class="row">
      <div class="col-12">header</div>
    </div>
    <div class="row">
      <!-- form -->
      <div class="col-8">
        <template-message-form :model-value="templateMessage" />
      </div>
      <!-- preview -->
      <div class="col-4">
        <pre>
          {{ templateMessage }}
        </pre>
        <v-preview />
      </div>
    </div>
    <!-- footer -->
    <div class="row">
      <div class="col-12">footer</div>
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

const templateMessage = ref(new TemplateMessage())
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
