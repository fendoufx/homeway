<template>
  <div class="product-detail" v-if="product">
    <!-- Header -->
    <div class="detail-header">
      <button class="back-btn" @click="goBack">← 返回</button>
      <h1>产品详情</h1>
      <button class="more-btn">...</button>
    </div>

    <!-- Product Info -->
    <div class="product-info">
      <div class="product-image">
        <div class="carousel">
          <img :src="product.image" :alt="product.name" />
        </div>
      </div>
      <div class="product-meta">
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-price">¥{{ product.price }}</p>
        <div class="product-rating">
          <span class="stars">★★★★☆</span>
          <span class="rating">({{ product.rating }})</span>
        </div>
        <p class="product-sales">已售 {{ product.sales }}+</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <button class="add-cart-btn" @click="addToCart">加入购物车</button>
      <button class="buy-now-btn" @click="buyNow">立即购买</button>
    </div>

    <!-- Product Parameters -->
    <div class="product-params">
      <h3>产品参数</h3>
      <div class="params-list">
        <div class="param-item">
          <span class="param-label">分类</span>
          <span class="param-value">{{ product.category }}</span>
        </div>
      </div>
    </div>

    <!-- Product Introduction -->
    <div class="product-intro">
      <h3>产品介绍</h3>
      <p>{{ product.description }}</p>
    </div>
  </div>
  <div v-else class="loading">
    加载中...
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { products, type Product } from '@/data/products'

const router = useRouter()
const route = useRoute()

// Get product by ID from route
const productId = parseInt(route.params.id as string)
const product = ref<Product | undefined>(undefined)

onMounted(() => {
  product.value = products.find(p => p.id === productId)
})

const goBack = () => {
  router.push('/products')
}

const addToCart = () => {
  alert('已加入购物车')
}

const buyNow = () => {
  router.push('/checkout')
}
</script>

<style scoped>
.product-detail {
  padding: 16px;
  max-width: 500px;
  margin: 0 auto;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.detail-header h1 {
  font-size: 18px;
  margin: 0;
}

.back-btn, .more-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
}

.product-info {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.product-image {
  flex: 0 0 140px;
}

.carousel img {
  width: 100%;
  border-radius: 8px;
}

.product-meta {
  flex: 1;
}

.product-name {
  font-size: 16px;
  margin: 0 0 8px 0;
}

.product-price {
  font-size: 20px;
  color: #ff5000;
  font-weight: bold;
  margin: 0 0 8px 0;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
}

.stars {
  color: #ffc107;
}

.rating {
  color: #666;
  font-size: 14px;
}

.product-sales {
  color: #999;
  font-size: 14px;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding: 12px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.add-cart-btn, .buy-now-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.add-cart-btn {
  background: #fff7e6;
  color: #ff5000;
  border: 1px solid #ff5000;
}

.buy-now-btn {
  background: #ff5000;
  color: white;
}

.product-params, .product-intro {
  margin-top: 20px;
}

.product-params h3, .product-intro h3 {
  font-size: 16px;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.params-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.param-item {
  display: flex;
  justify-content: space-between;
}

.param-label {
  color: #999;
}

.param-value {
  color: #333;
}

.product-intro p {
  color: #666;
  line-height: 1.6;
}
</style>
