<template>
  <div class="preview">
    <div class="preview-volume"></div>
    <div class="preview-lock"></div>
    <div class="preview-screen">
      <div class="preview-header">
        <div class="preview-header-content d-flex align-items-center m-4">
          <div class="content-icon text-white"><i class="bi bi-shop fs-6"></i></div>
          <hr class="text-white mx-3" />
        </div>
      </div>
      <div class="preview-body">
        <div class="template-message">
          <div class="overflow-x-hidden p-3">
            <div class="message">
              <div class="p-2">
                <div v-if="headerText || headerImage" class="header mb-3">
                  <h6 v-if="headerText">{{ headerText }}</h6>
                  <div v-else><img class="message-image" :src="headerImage" alt="Header Image" /></div>
                </div>
                <div class="body mb-3">{{ bodyText }}</div>
                <div class="footer">
                  <span class="powered">{{ footerText }}</span> <span class="time">{{ getCurrentTime() }}</span>
                </div>
              </div>
              <div v-if="buttonsComponent" class="buttons border-top px-2">
                <div v-for="(button, idx) in buttonsComponent.buttons" class="d-flex flex-column justify-content-center text-bolder" :key="idx">
                  <a
                    v-if="button.type == ButtonTypeEnum.call"
                    :href="`tel:${button.value.phone_number}`"
                    class="text-decoration-none text-primary d-flex align-items-center justify-content-center py-2"
                  >
                    <i class="bi bi-telephone-fill"></i> <span class="mx-2">{{ button.text }}</span>
                  </a>
                  <a
                    v-else-if="button.type == ButtonTypeEnum.url"
                    :href="`${button?.value.url}`"
                    target="_blank"
                    class="text-decoration-none text-primary d-flex align-items-center justify-content-center py-2 border-top"
                  >
                    <i class="bi bi-box-arrow-up-right"></i> <span class="mx-2">{{ button?.text }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="preview-body-footer"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, toRef } from 'vue'
import { type ITemplateMessage } from '../models/interface/i-template-message'
import { MessageComponentTypeEnum } from '../models/enum/MessageComponentTypeEnum'
import { type IMessageHeader } from '../models/interface/i-header'
import { type IMessageBody } from '../models/interface/i-body'
import { type IMessageFooter } from '../models/interface/i-footer'
import { type IMessageButtons } from '../models/interface/i-buttons'
import { ButtonTypeEnum } from '../models/enum/ButtonTypeEnum'
//props
const props = defineProps<{ message: ITemplateMessage }>()
const message = toRef(props, 'message') //computed
const headerComponent = computed(() => message.value?.components?.find(d => d.type == MessageComponentTypeEnum.header) as IMessageHeader)
const bodyComponent = computed(() => message.value?.components?.find(d => d.type == MessageComponentTypeEnum.body) as IMessageBody)
const footerComponent = computed(() => message.value?.components?.find(d => d.type == MessageComponentTypeEnum.footer) as IMessageFooter)
const buttonsComponent = computed(() => message.value?.components?.find(d => d.type == MessageComponentTypeEnum.buttons) as IMessageButtons)
const headerText = computed(() => headerComponent.value?.value?.text)
const headerImage = computed(() => headerComponent.value?.value?.url)
const bodyText = computed(() => bodyComponent.value?.text)
const footerText = computed(() => footerComponent.value?.text)
//methods
const getCurrentTime = (): string => {
  const now = new Date()
  let hours = now?.getHours() % 12
  const minutes = now?.getMinutes()?.toString()?.padStart(2, '0')
  const period = now?.getHours() >= 12 ? 'PM' : 'AM'
  return `${hours}:${minutes} ${period}`
}
</script>
