<script setup lang="ts">
import BaseModal from './components/BaseModal.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import { useErrorModal } from './stores/errorModal.ts'
const errorModalStore = useErrorModal()
</script>

<template>
  <a href="#main-content" class="skip-link">Vai al contenuto principale</a>
  <HeaderComponent />
  <main class="container" id="main-content" tabindex="1">
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
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background-color: var(--accent-color);
  color: white;
  padding: 0.75rem 1rem;
  z-index: 200;
}

.skip-link:focus {
  left: 0;
}
</style>
