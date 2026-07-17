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
  <section>
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
