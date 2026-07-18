import { defineStore } from "pinia";
import { ref } from 'vue'

export const useErrorModal = defineStore('error-modal', () => {
  const isOpen = ref(false);
  const message = ref('');

  function showError(msg: string) {
    message.value = msg;
    isOpen.value = true;
  }

  function closeError() {
    isOpen.value = false;
  }

  return { isOpen, message, showError, closeError }

})
