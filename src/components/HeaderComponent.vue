<script setup lang="ts">
import { getCategories } from '@/services/productService'
import { ref, onMounted } from 'vue'

const isMenuOpen = ref(false)

const categories = ref<string[]>([])

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

const fetcCategories = async () => {
  try {
    categories.value = await getCategories()
  } catch {
    console.log('error: Problem on get categories name')
  }
}

onMounted(() => {
  fetcCategories()
})
</script>

<template>
  <header>
    <h1>Q Commerce</h1>

    <nav class="nav-desktop">
      <ul>
        <ul>
          <li v-for="category in categories" :key="category">
            {{ category }}
          </li>
        </ul>
        <li>
          <a class="btn btn-fill" href="">Sign In</a>
        </li>
        <li>
          <a class="btn btn-outline" href="">Sign Up</a>
        </li>
      </ul>
    </nav>

    <button
      type="button"
      class="menu-toggle"
      @click="toggleMenu"
      :aria-expanded="isMenuOpen"
      aria-label="Apri menu di navigazione"
    >
      <span class="menu-toggle--bar"></span>
      <span class="menu-toggle--bar"></span>
      <span class="menu-toggle--bar"></span>
    </button>

    <Transition name="drawer">
      <nav v-if="isMenuOpen" class="nav-mobile" aria-label="Menu di navigazione mobile">
        <ul>
          <li v-for="category in categories" :key="category">
            {{ category }}
          </li>
        </ul>

        <div class="divider"></div>

        <ul>
          <li>
            <a href="" @click="closeMenu">Sign In</a>
          </li>
          <li>
            <a href="" @click="closeMenu">Sign Up</a>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
header {
  position: relative;
  width: 100%;
  padding: 1rem;
  background-color: var(--secondary-color);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 2rem;
    color: var(--accent-color);
  }
}

.divider {
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
}

.nav-desktop {
  ul {
    display: flex;
    align-items: center;
    gap: 1rem;

    li {
      list-style-type: none;
      color: var(--primary-color);

      .btn {
        font-size: 1rem;
        white-space: nowrap;
        display: inline-block;
        border: 1px solid var(--primary-color);
        padding: 0.2rem 1rem;
        border-radius: 14px;
      }
    }
  }
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  .menu-toggle--bar {
    width: 100%;
    height: 2px;
    background-color: var(--primary-color);
    border-radius: 2px;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
  }
}

.nav-mobile {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: var(--secondary-color);
  z-index: 10;
  color: var(--primary-color);
  ul {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  li {
    list-style-type: none;
  }

  a {
    display: block;
    padding: 0.75rem 0;
    color: var(--primary-color);
    font-size: 1rem;
    border-bottom: 1px solid var(--primary-color);
  }

  li:last-child a {
    border-bottom: none;
  }

  @media (min-width: 768px) {
    display: none;
  }
}

.drawer-enter-active,
.drawer-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
