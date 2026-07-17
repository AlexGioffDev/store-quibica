<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
</script>

<template>
  <HeaderComponent />
  <main class="container">
    <router-view />
  </main>
</template>

<style scoped>
.container {
  padding: 2rem;
}
</style>
