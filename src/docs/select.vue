<template>
  <div class="container">
    <!-- Basic Usage -->
    <div class="mb-5">
      <h3>Basic Usage</h3>
      <v-select modelValue="1" id="basic-select" label="Select your option" :items="selectItems" placeholder="Choose an option" />
    </div>

    <!-- With Validation State (Valid) -->
    <div class="mb-5">
      <h3>With Validation State (Valid)</h3>
      <v-select modelValue="1" id="valid-select" label="Select a valid option" :items="selectItems" placeholder="Choose an option" :validationState="ValidationStateEnum.valid" />
    </div>

    <!-- With Validation State (Invalid) -->
    <div class="mb-5">
      <h3>With Validation State (Invalid)</h3>
      <v-select
        id="invalid-select"
        label="Select a valid option"
        modelValue=""
        :items="selectItems"
        placeholder="Choose an option"
        :validationState="ValidationStateEnum.invalid"
        error="This field is required!"
      />
    </div>

    <!-- With Required Field (Red Asterisk) -->
    <div class="mb-5">
      <h3>With Required Field (Red Asterisk)</h3>
      <v-select id="required-select" label="Select an option" modelValue="2" :items="selectItems" placeholder="Choose an option" :required="true" />
    </div>

    <!-- Full Example with All Features (Required, Validation State, Error Message) -->
    <div class="mb-5">
      <h3>Full Example with All Features</h3>
      <v-select
        v-model="selectedOption"
        id="full-select"
        label="Select your favorite option"
        placeholder="Choose an option"
        :items="selectItems"
        :required="true"
        :validationState="validationState"
        :error="errorMessage"
      />
    </div>

    <div class="mb-5">
      <h3>Using v-model for Two-Way Binding</h3>
      <v-select id="v-model-select" label="Select an option" v-model="selectedOption" :items="selectItems" placeholder="Choose an option" />
      <div class="mt-3">Selected Option: {{ selectedOption }}</div>
    </div>

    <div class="mb-5">
      <h3>countries</h3>
      <v-select v-model="selectedCountry" id="v-model-select" label="Select an option" :items="countryItems" placeholder="Choose an option" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { ValidationStateEnum } from '../models/enum/ValidationStateEnum'

// Select options for the dropdown
const selectItems = [
  { value: '1', displayText: 'Option 1', id: 1 },
  { value: '2', displayText: 'Option 2', id: 2 },
  { value: '3', displayText: 'Option 3', id: 3 }
]

const countryItems = [
  { id: '1', value: '+971', displayText: '🇦🇪 +971' },
  { id: '2', value: '+966', displayText: '🇸🇦 +966' },
  { id: '3', value: '+965', displayText: '🇰🇼 +965' },
  { id: '4', value: '+974', displayText: '🇶🇦 +974' },
  { id: '5', value: '+973', displayText: '🇧🇭 +973' },
  { id: '6', value: '+968', displayText: '🇴🇲 +968' },
  { id: '7', value: '+967', displayText: '🇾🇪 +967' },
  { id: '8', value: '+962', displayText: '🇯🇴 +962' },
  { id: '9', value: '+963', displayText: '🇸🇾 +962' },
  { id: '10', value: '+964', displayText: '🇮🇶 +964' }
]

// Two-way data binding for the selected country
const selectedCountry = ref('+962')

// For two-way binding with v-model
const selectedOption = ref('')

// Validation state and error message for testing
const validationState = ref(ValidationStateEnum.invalid)
const errorMessage = 'Please make a selection.'

const VSelect = defineAsyncComponent(() => import('../components/VSelect.vue'))
</script>
