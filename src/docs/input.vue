<template>
  <div class="row">
    <div class="col-12">
      <h3>Variations of VInput</h3>

      <!-- Basic Text Input -->
      <div>
        <h5>Basic Text Input</h5>
        <VInput id="basic" label="Basic Input" v-model="basicInput" />
        <p>Value: {{ basicInput }}</p>
      </div>

      <hr />

      <!-- Required Input -->
      <div>
        <h5>Required Input</h5>
        <VInput id="required" label="Required Input" v-model="requiredInput" :required="true" />
        <p>Value: {{ requiredInput }}</p>
      </div>

      <hr />

      <!-- Multiline Input (Textarea) -->
      <div>
        <h5>Multiline (Textarea)</h5>
        <VInput id="multiline" label="Textarea Input" v-model="multilineInput" :multiline="true" :rows="4" />
        <p>Value: {{ multilineInput }}</p>
      </div>

      <hr />

      <!-- Input with Validation States -->
      <div>
        <h5>Input with Validation States</h5>
        <VInput id="validation" label="Validation Input" v-model="validationInput" :validationState="validationState" :error="'This field is required'" placeholder="Enter a value" />
        <button class="btn btn-primary mt-2" @click="toggleValidationState">Toggle Validation State</button>
        <p>Current State: {{ validationState }}</p>
      </div>

      <hr />

      <!-- Input with Placeholder -->
      <div>
        <h5>Input with Placeholder</h5>
        <VInput id="placeholder" label="Placeholder Input" v-model="placeholderInput" placeholder="Type something..." />
        <p>Value: {{ placeholderInput }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import { ref } from 'vue'
import { ValidationStateEnum } from '../models/enum/ValidationStateEnum'

// Reactive states for each variation
const basicInput = ref('')
const requiredInput = ref('')
const multilineInput = ref('')
const validationInput = ref('')
const placeholderInput = ref('')

// Validation state management
const validationState = ref(ValidationStateEnum.none)

const toggleValidationState = () => {
  validationState.value = validationState.value === ValidationStateEnum.valid ? ValidationStateEnum.invalid : ValidationStateEnum.valid
}
const VInput = defineAsyncComponent(() => import('../components/VInput.vue'))
</script>
