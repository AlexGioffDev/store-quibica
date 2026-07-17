import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ProductView from '@/views/ProductView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/products/:id",
      name: "product-detail",
      component: ProductView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    }
  ],
})

export default router
