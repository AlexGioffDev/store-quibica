<script setup lang="ts">
import BaseModal from './components/BaseModal.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import { useErrorModal } from './stores/errorModal.ts'
const errorModalStore = useErrorModal()
</script>

<template>
  <HeaderComponent />
  <main class="container">
    <router-view />
  </main>
  <BaseModal
    :is-open="errorModalStore.isOpen"
    title="Something went wrong"
    @close="errorModalStore.closeError()"
  >
    <p>{{ errorModalStore.message }}</p>
  </BaseModal>
</template>

<style scoped>
.container {
  padding: 2rem;
}
</style>
