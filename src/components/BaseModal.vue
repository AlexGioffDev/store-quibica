<!-- src/components/BaseModal.vue -->
<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
  title?: string
}>()

const emit = defineEmits<{
  close: []
}>()

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      window.addEventListener('keydown', handleKeydown)
    } else {
      window.removeEventListener('keydown', handleKeydown)
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click="emit('close')">
        <div class="modal-content" role="dialog" aria-modal="true" :aria-label="title" @click.stop>
          <button type="button" class="modal-close" aria-label="Chiudi" @click="emit('close')">
            ✕
          </button>
          <h2 v-if="title" class="modal-title">{{ title }}</h2>
          <div class="modal-body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.modal-content {
  position: relative;
  width: 100%;
  max-width: 24rem;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border-radius: var(--radius-md, 8px);
  box-shadow: var(--shadow-md, 0 8px 24px rgba(0, 0, 0, 0.4));
  padding: 1.5rem;
}

.modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: var(--secondary-color);
}

.modal-title {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  padding-right: 1.5rem;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
