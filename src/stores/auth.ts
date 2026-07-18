import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { login as LoginRequest } from "@/services/authService";
import type { LoginPayload } from "@/types";
import { useCartStore } from "./cart";

const TOKEN_STORAGE_KEY = "auth_token_qstore"
const USERNAME_STORAGE_KEY = "username_qstore"

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));
  const username = ref<string | null>(localStorage.getItem(USERNAME_STORAGE_KEY));
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => token.value !== null);

  async function login(payload: LoginPayload) {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await LoginRequest(payload);
      token.value = response.token;
      username.value = payload.username;
      localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
      localStorage.setItem(USERNAME_STORAGE_KEY, payload.username);
    } catch {
      error.value = "Invalid username or password";
      throw new Error("Login Failed");
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    const cartStore = useCartStore();
    cartStore.clearCart();
    token.value = null;
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USERNAME_STORAGE_KEY);
  }

  return {
    token,
    isLoading,
    error,
    isAuthenticated,
    username,
    login,
    logout
  }

})
