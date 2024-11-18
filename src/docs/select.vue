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

// For two-way binding with v-model
const selectedOption = ref('')

// Validation state and error message for testing
const validationState = ref(ValidationStateEnum.invalid)
const errorMessage = 'Please make a selection.'

const VSelect = defineAsyncComponent(() => import('../components/VSelect.vue'))
</script>
