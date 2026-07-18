<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Product } from '@/types'
import { getProducts, getProductsByCategory } from '@/services/productService'
import ProductCard from '@/components/ProductCard.vue'
import { useRoute } from 'vue-router'
import { useErrorModal } from '@/stores/errorModal'

const errorModal = useErrorModal()
const route = useRoute()

const products = ref<Product[]>([])
const isLoading = ref(false)

const fetchProducts = async () => {
  isLoading.value = true

  try {
    const category = route.query.category

    if (typeof category === 'string' && category.length > 0) {
      products.value = await getProductsByCategory(category)
    } else {
      products.value = await getProducts()
    }
  } catch {
    errorModal.showError('Something went wrong! try again later')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})

watch(
  () => route.query.category,
  () => {
    fetchProducts()
  },
)
</script>

<template>
  <div v-if="isLoading">
    <p>On Loading...</p>
  </div>
  <div v-else>
    <section class="section-container">
      <h3
        v-if="typeof route.query.category === 'string' && route.query.category.length > 0"
        class="title"
      >
        Our {{ route.query.category }} Products
      </h3>
      <h3 class="title" v-else>Our Products</h3>
      <div class="products-container">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.section-container {
  height: 100%;
}
.products-container {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
</style>
