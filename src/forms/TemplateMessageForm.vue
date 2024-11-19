<template>
  <fieldset>
    <form>
      <v-card title="Template Details" sub-title="Define your template name and language">
        <v-input v-model="modelValue.name" id="template-name" label="Template Name" placeholder="Enter template name..." :validationState="states.name" :error="errorMessages.name" required />

        <v-select
          v-model="modelValue.language"
          id="full-select"
          label="Language"
          placeholder="Choose an option"
          :items="languageItems"
          :required="true"
          :validationState="states.language"
          :error="errorMessages.language"
        />
      </v-card>

      <v-card title="Category" sub-title="Choose your message template">
        <v-visual-select v-model="modelValue.category" :categories="categories" :validationState="states.category" :error="errorMessages.category" />
      </v-card>

      <v-card title="Header" sub-title="Highlight your brand here, use images or videos, to stand out">
        <v-radio-buttons v-model="headerComponent.format" :items="headerFormatItems" :validationState="states.headerFormat" :error="errorMessages.headerFormat" name="header-format" class="mb-3" />
        <Transition name="fade">
          <div v-if="headerFormat.isText">
            <v-input v-model="headerTextValueModel" id="header-text" label="Text" placeholder="Enter header text..." :validationState="states.name" :error="errorMessages.name" required />
          </div>
          <div v-else-if="headerFormat.isImage"></div>
        </Transition>
      </v-card>

      <v-card title="Body" sub-title="Enter the text of your message in the language you’ve selected">
        <VInput v-model="bodyComponent.text" id="multiline" label="" multiline :rows="4" />
      </v-card>

      <v-card title="Footer" sub-title="Use this section for optional details like disclaimers, contact info, or additional context.">
        <v-input v-model="footerComponent.text" id="footer-text" label="" placeholder="Enter footer text..." />
      </v-card>

      <v-card title="Buttons" sub-title="Create buttons that let your customers respond to your message or take an action.">
        <v-radio-buttons v-model="buttonsRadioModel" :items="buttonsRadioItems" name="show-buttons" class="mb-3" />

        <v-records v-if="buttonsRadioModel" v-model="recordsModel" :record="recordDataTemplate" label="Buttons" :validationState="states.buttons" :error="errorMessages.buttons">
          <template #default="{ record, index: rIdx }">
            <div class="container">
              <div class="row">
                <div class="col-12 col-sm-3">
                  <v-select v-model="record.type" :id="`type-${record.type}-${rIdx}`" label="Button Type" placeholder="Select Button Type" :items="buttonTypeItems" :required="true" />
                </div>
                <template v-if="record.type == ButtonTypeEnum.url">
                  <div class="col-12 col-sm-3">
                    <v-input v-model="record.text" :id="`text-${record.type}-${rIdx}`" label="Button Text" placeholder="Enter button text..." required />
                  </div>
                  <div class="col-12 col-sm-6">
                    <v-input v-model="record.url!" :id="`url-${record.type}-${rIdx}`" label="Website URL" placeholder="https://arabot.io" required />
                  </div>
                </template>

                <template v-if="record.type == ButtonTypeEnum.call">
                  <div class="col-12 col-sm-3">
                    <v-input v-model="record.text" :id="`text-${record.type}-${rIdx}`" label="Button Text" placeholder="Enter button text..." required />
                  </div>
                  <div class="col-12 col-sm-6 d-flex flex-column">
                    <label class="form-label">
                      Phone Number
                      <span class="text-danger">*</span>
                    </label>
                    <div class="d-flex">
                      <v-select v-model="record.code" :id="`code-${record.type}-${rIdx}`" label="" placeholder=" " :items="countryItems" style="width: 120px" />
                      <v-input v-model="record.phoneNumber!" :id="`phone-${record.type}-${rIdx}`" label="" placeholder="7XXX XXXX" class="ms-2 flex-fill" />
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </v-records>
      </v-card>
    </form>
  </fieldset>
</template>

<script setup lang="ts">
import { computed, ComputedRef, defineAsyncComponent, reactive, Ref, ref, toRefs, watch } from 'vue'
import { LanguageEnum } from '../models/enum/LanguageEnum'
import { BrandFormatEnum } from '../models/enum/BrandFormatEnum'
import { ValidationStateEnum } from '../models/enum/ValidationStateEnum'
import { MessageCategoryEnum } from '../models/enum/MessageCategoryEnum'
import { MessageComponentTypeEnum } from '../models/enum/MessageComponentTypeEnum'

import type { ITemplateMessage } from '../models/interface/i-template-message'
import type { TItem } from '../models/type/t-items'
import type { TVisualItem } from '../models/type/t-visual-item'
import type { IMessageHeader } from '../models/interface/i-header'
import type { IMessageBody } from '../models/interface/i-body'
import type { IMessageFooter } from '../models/interface/i-footer'
import type { IMessageButtons } from '../models/interface/i-buttons'
import { ButtonTypeEnum } from '../models/enum/ButtonTypeEnum'
import { TRecordDataTemplate } from '../models/type/t-record-data-template'
import { MessageButton } from '../models/class/buttons'
import { TMessageComponentValue } from '../models/type/t-message-component-value'
import { splitPhoneNumber } from '../helper/utils'

const props = defineProps<{
  modelValue: ITemplateMessage
}>()

// refs
const { modelValue } = toRefs(props)
const headerComponent = ref(modelValue.value.components.find(c => c.type == MessageComponentTypeEnum.header)) as Ref<IMessageHeader>
const bodyComponent = ref(modelValue.value.components.find(c => c.type == MessageComponentTypeEnum.body)) as Ref<IMessageBody>
const footerComponent = ref(modelValue.value.components.find(c => c.type == MessageComponentTypeEnum.footer)) as Ref<IMessageFooter>
const buttonsComponent = ref(modelValue.value.components.find(c => c.type == MessageComponentTypeEnum.buttons)) as Ref<IMessageButtons>
const buttonsRadioModel = ref(buttonsComponent.value.buttons.length ? 'actions' : '')
const recordsModel = ref([
  ...buttonsComponent.value.buttons.map(button => {
    let code = ''
    let phoneNumber = ''
    if (button.type == ButtonTypeEnum.call && button.value.phone_number) {
      const { countryCode, localNumber } = splitPhoneNumber(button.value.phone_number)
      code = countryCode
      phoneNumber = localNumber
    }
    return {
      type: button.type,
      text: button.text,
      url: button.value?.url || '',
      code,
      phoneNumber
    } as TRecordDataTemplate
  })
]) as Ref<TRecordDataTemplate[]>
const recordDataTemplate = { type: '', text: '', url: '', code: '', phoneNumber: '' } as TRecordDataTemplate

const states = reactive({
  name: ValidationStateEnum.none,
  language: ValidationStateEnum.none,
  category: ValidationStateEnum.none,
  headerFormat: ValidationStateEnum.none,
  body: ValidationStateEnum.none,
  footer: ValidationStateEnum.none,
  buttons: ValidationStateEnum.none
}) as {
  name: ValidationStateEnum
  language: ValidationStateEnum
  category: ValidationStateEnum
  headerFormat: ValidationStateEnum
  body: ValidationStateEnum
  footer: ValidationStateEnum
  buttons: ValidationStateEnum
}

//computed
const errorMessages = computed(() => {
  return {
    name: states.name == ValidationStateEnum.invalid ? 'This field is required' : '',
    language: states.language == ValidationStateEnum.invalid ? 'This field is required' : '',
    headerFormat: states.headerFormat == ValidationStateEnum.invalid ? 'This field is required' : '',
    body: states.body == ValidationStateEnum.invalid ? 'This field is required' : '',
    footer: states.footer == ValidationStateEnum.invalid ? 'This field is required' : '',
    buttons: states.buttons == ValidationStateEnum.invalid ? 'This field is required' : ''
  }
}) as ComputedRef<{ name: string; language: string; category: string; headerFormat: string; body: string; footer: string; buttons: string }>

// languages
const languageItems = computed((): TItem[] => {
  return Object.entries(LanguageEnum)
    .filter(([, value]) => LanguageEnum.none != value)
    .map(([key, value], idx) => ({ value, displayText: key, id: idx }))
})

// categories
const categories = computed((): TVisualItem[] => [
  {
    value: MessageCategoryEnum.marketing,
    name: 'Marketing',
    description: 'Promotions, ads, campaigns.',
    icon: 'bi bi-megaphone',
    id: 1,
    selectedColor: 'var(--tm-purple)'
  },
  {
    value: MessageCategoryEnum.utility,
    name: 'Utility',
    description: 'Tools, utilities, services.',
    icon: 'bi bi-bell',
    id: 2,
    selectedColor: 'var(--tm-blue)'
  }
])

// header
const headerFormatItems = computed((): TItem[] => [
  {
    value: '',
    displayText: 'None',
    icon: '',
    id: 0
  },
  {
    value: BrandFormatEnum.text,
    displayText: 'Text',
    icon: 'bi bi-list',
    id: 1
  },
  {
    value: BrandFormatEnum.image,
    displayText: 'Image',
    icon: 'bi bi-card-image',
    id: 2
  }
])

const headerFormat = computed(() => ({
  isText: headerComponent.value.format == BrandFormatEnum.text,
  isImage: headerComponent.value.format == BrandFormatEnum.image
}))

const headerTextValueModel = computed({
  get(): string {
    return headerComponent.value.value.text || ''
  },
  set(newValue: string): void {
    headerComponent.value.value.text = newValue
  }
})

const buttonsRadioItems = computed((): TItem[] => [
  {
    value: '',
    displayText: 'None',
    icon: '',
    id: 0
  },
  {
    value: 'actions',
    displayText: 'Call to actions',
    icon: 'bi bi-0-circle',
    id: 1
  }
])

// button type items
const buttonTypeItems = computed((): TItem[] => {
  return Object.entries(ButtonTypeEnum)
    .filter(([, value]) => ButtonTypeEnum.none != value)
    .map(([key, value], idx) => ({ value, displayText: key, id: idx }))
})

const countryItems = computed((): TItem[] => [
  { id: 1, value: '+971', displayText: '🇦🇪 +971' },
  { id: 2, value: '+966', displayText: '🇸🇦 +966' },
  { id: 3, value: '+965', displayText: '🇰🇼 +965' },
  { id: 4, value: '+974', displayText: '🇶🇦 +974' },
  { id: 5, value: '+973', displayText: '🇧🇭 +973' },
  { id: 6, value: '+968', displayText: '🇴🇲 +968' },
  { id: 7, value: '+967', displayText: '🇾🇪 +967' },
  { id: 8, value: '+962', displayText: '🇯🇴 +962' },
  { id: 9, value: '+963', displayText: '🇸🇾 +962' },
  { id: 10, value: '+964', displayText: '🇮🇶 +964' }
])

// methods

const validate = (): boolean => {
  let valid = true
  return valid
}

// watchers
watch(
  () => headerFormat.value,
  to => {
    if (to.isText) headerComponent.value.resetValue('url')
    else if (to.isImage) headerComponent.value.resetValue('text')
    else {
      headerComponent.value.resetValue('url')
      headerComponent.value.resetValue('text')
    }
  }
)

watch(
  () => recordsModel.value,
  to => {
    buttonsComponent.value.buttons = to.map(record => {
      const { type, text, url, code, phoneNumber } = record
      const value = url ? { url } : phoneNumber ? ({ phone_number: `${code}${phoneNumber}` } as TMessageComponentValue) : {}
      return new MessageButton({ type: type as ButtonTypeEnum, text, value })
    })
  },
  { deep: true }
)

defineExpose({ validate })

const VInput = defineAsyncComponent(() => import('../components/VInput.vue'))
const VRadioButtons = defineAsyncComponent(() => import('../components/VRadioButtons.vue'))
const VSelect = defineAsyncComponent(() => import('../components/VSelect.vue'))
const VVisualSelect = defineAsyncComponent(() => import('../components/VVisualSelect.vue'))
const VRecords = defineAsyncComponent(() => import('../components/VRecords.vue'))
const VCard = defineAsyncComponent(() => import('../components/VCard.vue'))
</script>
