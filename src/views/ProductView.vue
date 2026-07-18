<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '@/types'
import { getProductById } from '@/services/productService'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { LucideShoppingCart } from 'lucide-vue-next'
import { useErrorModal } from '@/stores/errorModal'

const errorModal = useErrorModal()

const route = useRoute()

const authStore = useAuthStore()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const isLoading = ref(false)

const fetchProduct = async () => {
  isLoading.value = true

  try {
    const id = Number(route.params.id)
    product.value = await getProductById(id)
  } catch {
    errorModal.showError('Something went wrong! try again later')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProduct()
})

watch(
  () => route.params.id,
  () => fetchProduct(),
)
</script>

<template>
  <div v-if="isLoading">
    <p>On Loading...</p>
  </div>
  <article v-else-if="product" class="product-container">
    <div class="product-image__wrapper">
      <img :src="product.image" :alt="product.title" />
    </div>
    <div class="product-info">
      <h3 class="product-info__category">{{ product.category }}</h3>
      <h1 class="product-info__title">{{ product.title }}</h1>
      <div class="product-info__box">
        <button
          class="btn btn-cart"
          v-if="authStore.isAuthenticated"
          @click="cartStore.addToCart(product)"
        >
          <LucideShoppingCart :size="28" />
        </button>
        <p class="product-info__price">{{ product.price.toFixed(2) }} €</p>
      </div>
      <p class="product-info__description">
        {{ product.description.slice(0, 1).toUpperCase() + product.description.slice(1) }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.product-container {
  width: 100%;

  @media (min-width: 1024px) {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
}

.product-image__wrapper {
  width: 100%;
  height: auto;
  padding: 1rem;

  @media (min-width: 768px) {
    height: 40rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.btn-cart {
  color: var(--secondary-color);
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  .product-info__category {
    font-size: 1rem;
    color: #868686;

    @media (min-width: 768px) {
      font-size: 1.3rem;
    }
  }

  .product-info__title {
    font-size: 2rem;
    color: var(--accent-color);
    font-weight: bold;
    line-height: 1.2;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .product-info__box {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: flex-end;
  }

  .product-info__price {
    align-self: flex-end;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--accent-color);

    @media (min-width: 768px) {
      font-size: 1.8rem;
    }
  }

  .product-info__description {
    font-size: 1.4rem;
    color: #4b5563;
    line-height: 1.6;
    text-align: justify;

    @media (min-width: 768px) {
      font-size: 1.6rem;
    }
  }
}
</style>
