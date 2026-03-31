import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import ProductPage from '../views/ProductPage.vue'
import ProductDetail from '../views/ProductDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductPage,
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetail,
    },
  ],
})

export default router