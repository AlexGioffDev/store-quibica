<script setup lang="ts">
import { getCategories } from '@/services/productService'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { useCartStore } from '@/stores/cart'

const authStore = useAuthStore()
const themeStore = useThemeStore()
const cartStore = useCartStore()
import { LogIn, LogOut, ShoppingCart, Sun, Moon, X, Trash } from 'lucide-vue-next'

const isCartOpen = ref(false)

const categories = ref<string[]>([])

function toggleCart() {
  isCartOpen.value = !isCartOpen.value
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
    <div class="top">
      <router-link :to="{ name: 'home' }">
        <h1>QCommerce</h1>
      </router-link>
      <nav>
        <ul v-if="authStore.isAuthenticated">
          <li>
            <button class="btn" aria-label="logout" @click="authStore.logout">
              <LogOut :size="28" />
            </button>
          </li>
        </ul>
        <ul v-else>
          <li>
            <router-link :to="{ name: 'login' }">
              <button class="btn" aria-label="login">
                <LogIn :size="28" />
              </button>
            </router-link>
          </li>
        </ul>
        <div class="action__container">
          <div class="cart__container" v-if="authStore.isAuthenticated">
            <button
              class="btn"
              @click="toggleCart"
              aria-label="Apri carrello"
              :aria-expanded="isCartOpen"
            >
              <ShoppingCart :size="28" />
            </button>
            <div v-if="cartStore.totalItems > 0" class="cart__items">
              <p v-if="cartStore.totalItems <= 10">
                {{ cartStore.totalItems }}
              </p>
              <p v-else>10+</p>
            </div>
            <Transition name="dropdown">
              <div v-if="isCartOpen" class="cart-menu">
                <div class="cart-menu__top">
                  <p>Cart</p>
                  <button class="btn" @click="toggleCart">
                    <X :size="28" />
                  </button>
                </div>
                <div class="cart-menu__body">
                  <p v-if="cartStore.items.length <= 0">The Cart is empty</p>
                  <div v-else class="cart-menu__products">
                    <div
                      v-for="product in cartStore.items"
                      :key="product.id"
                      class="cart-menu__product"
                    >
                      <img
                        class="cart-menu__product-image"
                        :src="product.image"
                        :alt="product.title"
                      />
                      <p class="cart-menu__product-divider">X</p>
                      <p class="cart-menu__product-qty">{{ product.quantity }}</p>
                      <p class="cart-menu__product-price">{{ product.price.toFixed(2) }} €</p>
                    </div>
                  </div>
                  <hr style="color: var(--accent-color)" />
                  <div class="cart-menu__action" v-if="cartStore.items.length > 0">
                    <h3>
                      Total: <span>{{ cartStore.totalPrice.toFixed(2) }} €</span>
                    </h3>
                    <button
                      class="btn btn-trash"
                      @click="
                        () => {
                          cartStore.clearCart()
                          toggleCart()
                        }
                      "
                    >
                      <h3>Clear</h3>
                      <Trash :size="28" />
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
          <button @click="themeStore.toggleTheme" class="btn">
            <Sun v-if="themeStore.theme === 'light'" :size="28" />
            <Moon v-else :size="28" />
          </button>
        </div>
      </nav>
    </div>
    <div class="down">
      <div class="categories-container">
        <router-link :to="{ name: 'home' }">
          <p>All</p>
        </router-link>
        <router-link
          v-for="category in categories"
          :key="category"
          :to="{ name: 'home', query: { category: category } }"
        >
          <p>{{ category }}</p>
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: relative;
  width: 100%;
  padding: 2rem 1rem;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 2rem;
      color: var(--accent-color);
    }

    nav {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: flex-end;
      ul {
        display: flex;
        align-items: center;
      }

      .action__container {
        display: flex;
      }

      .cart__container {
        position: relative;

        .cart__items {
          background-color: var(--accent-color);
          border-radius: 100%;
          position: absolute;
          width: 1.9rem;
          height: 1.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-color);
          font-weight: 700;
          right: -8px;
          top: -15px;
        }

        .cart-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 20rem;
          max-width: 90vw;
          height: 100dvh;
          z-index: 40;
          background-color: var(--secondary-color);
          box-shadow: var(--shadow-md, -4px 0 12px rgba(0, 0, 0, 0.3));
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;

          .cart-menu__top {
            display: flex;
            align-items: center;
            justify-content: space-between;

            p {
              font-size: 2rem;
              font-weight: 700;
              color: var(--primary-color);
            }
          }

          .cart-menu__body {
            padding: 1rem;
            color: var(--primary-color);
            height: 100%;

            p {
              font-size: 1.4rem;
              font-style: italic;
            }

            .cart-menu__products {
              display: flex;
              flex-direction: column;
              gap: 1rem;
              max-height: 70%;
              overflow-y: auto;
              margin-bottom: 1rem;
              .cart-menu__product {
                display: flex;
                align-items: center;
                gap: 1rem;

                .cart-menu__product-image {
                  width: 3rem;
                  height: 3rem;
                  object-fit: cover;
                }

                .cart-menu__product-divider {
                  font-size: 0.8rem;
                  font-weight: 600;
                }

                .cart-menu__product-qty {
                  font-size: 1.3rem;
                  font-weight: 600;
                }

                .cart-menu__product-price {
                  color: var(--accent-color);
                  font-weight: 700;
                  font-size: 1.7rem;
                }
              }
            }

            .cart-menu__action {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 1rem;
              gap: 1rem;

              h3 {
                font-size: 1.4rem;
                font-weight: 700;

                span {
                  color: var(--accent-color);
                }
              }

              .btn-trash {
                border: 1px solid var(--secondary-color);
                border-radius: 14px;
                background-color: var(--primary-color);
                display: flex;
                align-items: center;
                color: var(--secondary-color);
              }
            }
          }
        }
      }
    }
  }

  .down {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--primary-color);

    .categories-container {
      padding: 0 1.2rem;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;
      overflow-x: auto;

      p {
        font-size: 1rem;
        font-weight: 600;
      }
    }
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: transform 0.25s ease;
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    transform: translateX(100%);
  }
}
</style>
