<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    size?: number
    label?: string
  }>(),
  {
    size: 32,
    label: 'Loading...',
  },
)
</script>

<template>
  <div class="spinner" role="status">
    <LoaderCircle :size="size" class="spinner__icon" />
    <span class="sr-only">{{ label }}</span>
  </div>
</template>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  color: var(--accent-color);
}

.spinner__icon {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
