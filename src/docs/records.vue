<template>
  <div>
    <h1>Record Manager Demo</h1>
    {{ buttons }}
    <v-records v-model="records" label="Buttons" :validationState="validationState" error="Please provide valid records.">
      <template #default="{ record }">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-3">
              <VInput id="basic" label="Website URL" v-model="record.text" />
            </div>
            <div class="col-12 col-sm-3">
              <VInput id="basic" label="Website URL" v-model="record.tt" />
            </div>
            <div class="col-12 col-md-6">
              <VInput id="basic" label="Website URL" v-model="record.df" />
            </div>
          </div>
        </div>
      </template>
    </v-records>
    <pre>{{ records }}</pre>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { ValidationStateEnum } from '../models/enum/ValidationStateEnum'
import { MessageButton, MessageButtons } from '../models/class/buttons'

const buttons = ref(new MessageButtons())
const model = MessageButton
const records = ref([{}])
const validationState = ref(ValidationStateEnum.valid)
const VRecords = defineAsyncComponent(() => import('../components/VRecords.vue'))
const VInput = defineAsyncComponent(() => import('../components/VInput.vue'))
</script>
