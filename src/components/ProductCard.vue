<script setup lang="ts">
import type { Product } from '@/types'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { LucideShoppingCart } from 'lucide-vue-next'

const authStore = useAuthStore()
const cartStore = useCartStore()

defineProps<{ product: Product }>()
</script>

<template>
  <router-link :to="{ name: 'product-detail', params: { id: product.id } }">
    <article class="product-card">
      <div class="product-card__image-wrapper">
        <img :src="product.image" :alt="product.title" class="product-card__image" />
      </div>
      <div class="product-card__body">
        <h3 class="product-card__category">{{ product.category }}</h3>
        <h3 class="product-card__title">{{ product.title.slice(0, 40) }}</h3>
        <div class="product-card__info">
          <button
            class="btn btn-cart"
            v-if="authStore.isAuthenticated"
            @click.stop.prevent="cartStore.addToCart(product)"
          >
            <LucideShoppingCart />
          </button>
          <p class="product-card__price">{{ product.price.toFixed(2) }} €</p>
        </div>
      </div>
    </article>
  </router-link>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 20rem;
  height: 24rem;
  border: 1px solid rgba(0, 0, 0, 1);
  background-color: #eeeeee;
  border-radius: 14px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.8);
  .product-card__image-wrapper {
    width: 100%;
    height: 15rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .product-card__body {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    .product-card__category {
      font-size: 0.8rem;
      color: #8f8f8f;
    }

    .product-card__info {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.5rem;

      .btn-cart {
        color: var(--secondary-color);
      }

      .product-card__price {
        color: var(--accent-color);
        font-weight: 700;
        font-size: 1rem;
      }
    }

    .product-card__title {
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--accent-color);
    }
  }
}
</style>
