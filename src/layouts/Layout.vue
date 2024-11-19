<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Left Sidebar -->
      <div class="col-2 bg-light p-4">
        <h4>Navigation</h4>
        <nav>
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/input" class="nav-link">Input</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/select" class="nav-link">Select</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/visual-select" class="nav-link">Visual Select</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/radio-buttons" class="nav-link">Radio Buttons</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/preview" class="nav-link">Preview</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/buttons" class="nav-link">buttons</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/image" class="nav-link">Image</router-link>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Right Content Area -->
      <div class="col-10 p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// You can add any additional logic for the layout component if needed
</script>

<style scoped>
/* Optional custom styling */
</style>
