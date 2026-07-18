<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')

const authStore = useAuthStore()
const router = useRouter()

async function handleLogin() {
  try {
    await authStore.login({
      username: username.value,
      password: password.value,
    })
    router.push({ name: 'home' })
  } catch {}
}
</script>

<template>
  <section class="form-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" autocomplete="username" required v-model="username" />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          v-model="password"
          id="password"
          autocomplete="current-password"
          required
        />
      </div>

      <div v-if="authStore.error" role="alert">
        {{ authStore.error }}
      </div>

      <button type="submit" :disabled="authStore.isLoading">
        {{ authStore.isLoading ? 'Signing In...' : 'Sign In' }}
      </button>
    </form>
  </section>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  height: 100%;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--accent-color);
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    div {
      display: flex;
      align-items: center;
      gap: 1rem;

      label {
        font-weight: 600;
        color: var(--secondary-color);
      }

      input {
        border: none;
        outline: none;
        padding: 0.25rem 1rem;
        background: var(--accent-color);
        border-radius: 14px;
      }
    }
    button {
      border: 1px solid var(--secondary-color);
      background-color: var(--accent-color);
      padding: 0.2rem 1rem;
      border-radius: 14px;
      color: var(--secondary-color);
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
}
</style>
