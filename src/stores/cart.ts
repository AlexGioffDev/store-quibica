import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Product, CartItem } from "@/types";

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));

  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0));

  function addToCart(product: Product) {
    const existingItem = items.value.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({
        id: product.id,
        image: product.image,
        title: product.title,
        price: product.price,
        quantity: 1
      })
    }

  }

  function removeFromCart(id: number) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  function updateQuantity(id: number, quantity: number) {
    const item = items.value.find((item) => item.id === id);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(id)
      } else {
        item.quantity = quantity;
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }

})
