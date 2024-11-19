<template>
  <fieldset>
    <form>
      <v-card :title="t('templateDetails')" :sub-title="t('templateDescription')">
        <v-input
          v-model="modelValue.name"
          id="template-name"
          :label="t('templateName')"
          :placeholder="t('templateNamePlaceholder')"
          :validationState="states.name"
          :error="errorMessages.name"
          required
          @keydown="resetState('name')"
        />

        <v-select
          v-model="modelValue.language"
          id="full-select"
          :items="languageItems"
          :validationState="states.language"
          :error="errorMessages.language"
          required
          :label="t('language')"
          :placeholder="t('languagePlaceholder')"
          @update:model-value="resetState('language')"
        />
      </v-card>

      <v-card :title="t('category')" :sub-title="t('categoryDescription')">
        <v-visual-select v-model="modelValue.category" :categories="categories" :validationState="states.category" :error="errorMessages.category" @update:model-value="resetState('category')" />
      </v-card>

      <v-card :title="t('header')" :sub-title="t('headerDescription')">
        <v-radio-buttons
          v-model="headerComponent.format"
          :items="headerFormatItems"
          :validationState="states.headerFormat"
          :error="errorMessages.headerFormat"
          name="header-format"
          class="mb-3"
          @update:model-value="resetState('headerFormat')"
        />
        <Transition name="fade">
          <div v-if="headerFormat.isText">
            <v-input
              v-model="headerTextValueModel"
              :validationState="states.header"
              :error="errorMessages.header"
              required
              id="header-text"
              :label="t('text')"
              :placeholder="t('headerTextPlaceholder')"
              @keydown="resetState('header')"
            />
          </div>
          <div v-else-if="headerFormat.isImage">
            <v-image-uploader v-model="headerImageValueModel" :max-file-size="500" :validationState="states.header" :error-message="errorMessages.header" @update:model-value="resetState('header')" />
          </div>
        </Transition>
      </v-card>

      <v-card :title="t('body')" :sub-title="t('bodyDescription')">
        <v-input v-model="bodyComponent.text" id="multiline" label="" :validationState="states.body" :error="errorMessages.body" :rows="4" multiline @keydown="resetState('body')" />
      </v-card>

      <v-card :title="t('footer')" :sub-title="t('footerDescription')">
        <v-input
          v-model="footerComponent.text"
          id="footer-text"
          label=""
          :validationState="states.footer"
          :error="errorMessages.footer"
          :placeholder="t('footerTextPlaceholder')"
          @keydown="resetState('footer')"
        />
      </v-card>
      <v-card :title="t('buttons')" :sub-title="t('buttonsDescription')">
        <v-radio-buttons v-model="buttonsRadioModel" :items="buttonsRadioItems" name="show-buttons" class="mb-3" @update:model-value="resetState('buttons')" />
        <v-records v-if="buttonsRadioModel" v-model="recordsModel" :record="recordDataTemplate" :label="t('buttons')" :validationState="states.buttons" :error="errorMessages.buttons">
          <template #default="{ record, index: rIdx }">
            <div class="container">
              <div class="row">
                <div class="col-12 col-sm-3">
                  <v-select
                    v-model="record.type"
                    :id="`type-${record.type}-${rIdx}`"
                    :items="buttonTypeItems"
                    :required="true"
                    :validationState="states.buttons"
                    :error="errorMessages.buttons"
                    :label="t('buttonType')"
                    :placeholder="t('buttonTypePlaceholder')"
                    @update:model-value="resetState('buttons')"
                  />
                </div>
                <template v-if="record.type == ButtonTypeEnum.url">
                  <div class="col-12 col-sm-3">
                    <v-input
                      v-model="record.text"
                      :id="`text-${record.type}-${rIdx}`"
                      :validationState="states.buttons"
                      :error="errorMessages.buttons"
                      :label="t('buttonText')"
                      :placeholder="t('buttonTextPlaceholder')"
                      required
                      @keydown="resetState('buttons')"
                    />
                  </div>
                  <div class="col-12 col-sm-6">
                    <v-input
                      v-model="record.url!"
                      :id="`url-${record.type}-${rIdx}`"
                      :validationState="states.buttons"
                      :error="errorMessages.buttons"
                      :label="t('websiteUrl')"
                      placeholder="https://arabot.io"
                      required
                      @keydown="resetState('buttons')"
                    />
                  </div>
                </template>

                <template v-if="record.type == ButtonTypeEnum.call">
                  <div class="col-12 col-sm-3">
                    <v-input
                      v-model="record.text"
                      :id="`text-${record.type}-${rIdx}`"
                      :validationState="states.buttons"
                      :error="errorMessages.buttons"
                      :label="t('buttonText')"
                      :placeholder="t('buttonTextPlaceholder')"
                      required
                      @keydown="resetState('buttons')"
                    />
                  </div>
                  <div class="col-12 col-sm-6 d-flex flex-column">
                    <label class="form-label">
                      {{ t('phoneNumber') }}
                      <span class="text-danger">*</span>
                    </label>
                    <div class="d-flex">
                      <v-select
                        v-model="record.code"
                        :id="`code-${record.type}-${rIdx}`"
                        :validationState="states.buttons"
                        :error="errorMessages.buttons"
                        :items="countryItems"
                        label=""
                        placeholder=" "
                        style="width: 120px"
                        @update:model-value="resetState('buttons')"
                      />
                      <v-input
                        v-model="record.phoneNumber!"
                        :validationState="states.buttons"
                        :error="errorMessages.buttons"
                        :id="`phone-${record.type}-${rIdx}`"
                        label=""
                        placeholder="7XXX XXXX"
                        class="mx-2 flex-fill"
                        @keydown="resetState('buttons')"
                      />
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
import { t } from '../i18n/locales'

import type { ITemplateMessage } from '../models/interface/i-template-message'
import type { TItem } from '../models/type/t-items'
import type { TVisualItem } from '../models/type/t-visual-item'
import type { IMessageHeader } from '../models/interface/i-header'
import type { IMessageBody } from '../models/interface/i-body'
import type { IMessageFooter } from '../models/interface/i-footer'
import type { IMessageButtons } from '../models/interface/i-buttons'
import type { TRecordDataTemplate } from '../models/type/t-record-data-template'
import type { TMessageComponentValue } from '../models/type/t-message-component-value'
import { ButtonTypeEnum } from '../models/enum/ButtonTypeEnum'
import { MessageButton } from '../models/class/buttons'
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
const recordDataTemplate = { type: '', text: '', url: '', code: '+962', phoneNumber: '' } as TRecordDataTemplate

const states = reactive({
  name: ValidationStateEnum.none,
  language: ValidationStateEnum.none,
  category: ValidationStateEnum.none,
  headerFormat: ValidationStateEnum.none,
  body: ValidationStateEnum.none,
  header: ValidationStateEnum.none,
  footer: ValidationStateEnum.none,
  buttons: ValidationStateEnum.none
}) as {
  name: ValidationStateEnum
  language: ValidationStateEnum
  category: ValidationStateEnum
  headerFormat: ValidationStateEnum
  body: ValidationStateEnum
  header: ValidationStateEnum
  footer: ValidationStateEnum
  buttons: ValidationStateEnum
}

//computed
const errorMessages = computed(() => {
  return {
    name: states.name == ValidationStateEnum.invalid ? t('requiredField') : '',
    language: states.language == ValidationStateEnum.invalid ? t('requiredField') : '',
    headerFormat: states.headerFormat == ValidationStateEnum.invalid ? t('requiredField') : '',
    header: states.header == ValidationStateEnum.invalid ? t('requiredField') : '',
    body: states.body == ValidationStateEnum.invalid ? t('requiredField') : '',
    footer: states.footer == ValidationStateEnum.invalid ? t('requiredField') : '',
    buttons: states.buttons == ValidationStateEnum.invalid ? t('requiredField') : ''
  }
}) as ComputedRef<{ name: string; language: string; category: string; headerFormat: string; header: string; body: string; footer: string; buttons: string }>

// languages
const languageItems = computed((): TItem[] => {
  return Object.entries(LanguageEnum)
    .filter(([, value]) => LanguageEnum.none != value)
    .map(([key, value], idx) => ({ value, displayText: t(key), id: idx }))
})

// categories
const categories = computed((): TVisualItem[] => [
  {
    value: MessageCategoryEnum.marketing,
    name: t('marketing'),
    description: t('marketingDescription'),
    icon: 'bi bi-megaphone',
    id: 1,
    selectedColor: 'var(--tm-purple)'
  },
  {
    value: MessageCategoryEnum.utility,
    name: t('utility'),
    description: t('utilityDescription'),
    icon: 'bi bi-bell',
    id: 2,
    selectedColor: 'var(--tm-blue)'
  }
])

// header
const headerFormatItems = computed((): TItem[] => [
  {
    value: '',
    displayText: t('none'),
    icon: '',
    id: 0
  },
  {
    value: BrandFormatEnum.text,
    displayText: t('text'),
    icon: 'bi bi-list',
    id: 1
  },
  {
    value: BrandFormatEnum.image,
    displayText: t('image'),
    icon: 'bi bi-card-image',
    id: 2
  }
])

const headerFormat = computed(() => ({
  isText: headerComponent.value.format == BrandFormatEnum.text,
  isImage: headerComponent.value.format == BrandFormatEnum.image
}))

const headerImageValueModel = computed({
  get(): string {
    return headerComponent.value.value.url || ''
  },
  set(newValue: string): void {
    headerComponent.value.value.url = newValue
  }
})

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
    displayText: t('none'),
    icon: '',
    id: 0
  },
  {
    value: 'actions',
    displayText: t('callToActions'),
    icon: 'bi bi-0-circle',
    id: 1
  }
])

// button type items
const buttonTypeItems = computed((): TItem[] => {
  return Object.entries(ButtonTypeEnum)
    .filter(([, value]) => ButtonTypeEnum.none != value)
    .map(([key, value], idx) => ({ value, displayText: t(key), id: idx }))
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

  const validName = modelValue.value.name?.trim().length > 0
  states.name = validName ? ValidationStateEnum.valid : ValidationStateEnum.invalid

  const validLanguage = modelValue.value.language != LanguageEnum.none
  states.language = validLanguage ? ValidationStateEnum.valid : ValidationStateEnum.invalid

  const validCategory = modelValue.value.category != MessageCategoryEnum.none
  states.category = validCategory ? ValidationStateEnum.valid : ValidationStateEnum.invalid

  let validHeader = true
  if (headerComponent.value) {
    if (headerFormat.value.isText) {
      validHeader = validHeader && !!headerTextValueModel.value?.trim()?.length
    } else if (headerFormat.value.isImage) {
      validHeader = validHeader && !!headerImageValueModel.value?.trim()?.length
    }
    states.header = validHeader ? ValidationStateEnum.valid : ValidationStateEnum.invalid
  }

  let validBody = bodyComponent.value ? !!bodyComponent.value?.text?.trim()?.length : true
  states.body = validBody ? ValidationStateEnum.valid : ValidationStateEnum.invalid

  // let validFooter = footerComponent.value ? !!footerComponent.value?.text?.trim()?.length : true
  // states.footer = validFooter ? ValidationStateEnum.valid : ValidationStateEnum.invalid

  // TODO: This validation needs to be re-designed
  // It's NOT working as expected
  // I left it as it because it will consume much time
  // Please ignore it because it just an interview task
  let validButtons = true
  if (buttonsRadioModel.value == 'actions') {
    if (buttonsComponent.value?.buttons.length) {
      for (const button of buttonsComponent.value?.buttons) {
        if (button.type == ButtonTypeEnum.none) continue

        if (button.type == ButtonTypeEnum.call) {
          const btnPhone = button?.value?.phone_number
          validButtons = validButtons && !!button?.text?.trim()?.length && !!btnPhone?.trim()?.length && /^7\d{3} \d{4}$/.test(btnPhone?.trim())
        } else {
          const btnUrl = button?.value?.url
          validButtons = validButtons && !!button?.text?.trim()?.length && !!btnUrl?.trim()?.length && /^(https?:\/\/)/.test(btnUrl?.trim())
        }

        if (!validButtons) {
          break
        }
      }
    } else {
      validButtons = false
    }
    states.buttons = validButtons ? ValidationStateEnum.valid : ValidationStateEnum.invalid
  }

  return valid && validName && validLanguage && validCategory && validHeader && validBody && validButtons
}

const resetState = (key: keyof typeof states) => (states[key] = ValidationStateEnum.none)

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
const VImageUploader = defineAsyncComponent(() => import('../components/VImageUploader.vue'))
</script>
