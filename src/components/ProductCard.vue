<script setup lang="ts">
import type { Product } from '@/types'

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
        <p class="product-card__price">{{ product.price.toFixed(2) }} €</p>
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

    .product-card__title {
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--accent-color);
    }

    .product-card__price {
      align-self: flex-end;
      font-weight: 600;
      font-size: 1rem;
      color: var(--secondary-color);
    }
  }
}
</style>
