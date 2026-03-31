<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { products, type Product } from '@/data/products'

const router = useRouter()
const route = useRoute()

const productId = parseInt(route.params.id as string)
const product = ref<Product | undefined>(undefined)
const showCartToast = ref(false)
const imageLoaded = ref(false)

onMounted(() => {
  product.value = products.find(p => p.id === productId)
})

const goBack = () => {
  router.push('/products')
}

const addToCart = () => {
  showCartToast.value = true
  setTimeout(() => {
    showCartToast.value = false
  }, 2000)
}

const buyNow = () => {
  router.push('/checkout')
}

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  let stars = '★'.repeat(fullStars)
  if (hasHalf) stars += '☆'
  return stars.padEnd(5, '☆')
}
</script>

<template>
  <div class="product-detail-page">
    <!-- 科技网格背景 -->
    <div class="tech-grid"></div>
    
    <!-- Header -->
    <header class="detail-header">
      <button class="back-btn" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        返回
      </button>
      <h1 class="page-title">产品详情</h1>
      <button class="more-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2"/>
          <circle cx="12" cy="12" r="2"/>
          <circle cx="12" cy="19" r="2"/>
        </svg>
      </button>
    </header>

    <!-- Loading State -->
    <div v-if="!product" class="loading-container">
      <div class="loading-spinner"></div>
      <span>加载中...</span>
    </div>

    <!-- Product Content -->
    <main v-else class="product-content">
      <!-- Image Section -->
      <div class="image-section">
        <div class="image-wrapper" :class="{ loaded: imageLoaded }">
          <img 
            :src="product.image" 
            :alt="product.name"
            @load="imageLoaded = true"
          />
          <div class="image-overlay">
            <span class="category-badge">{{ product.category }}</span>
          </div>
        </div>
      </div>

      <!-- Info Section -->
      <div class="info-section">
        <div class="product-header">
          <h2 class="product-name">{{ product.name }}</h2>
          <div class="product-rating">
            <span class="stars">{{ renderStars(product.rating) }}</span>
            <span class="rating-value">{{ product.rating }}</span>
          </div>
        </div>

        <div class="product-price-row">
          <span class="price">¥{{ product.price }}</span>
          <span class="sales">已售 {{ product.sales }}+ 件</span>
        </div>

        <p class="product-description">{{ product.description }}</p>

        <!-- Product Stats -->
        <div class="product-stats">
          <div class="stat-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>{{ product.rating }} 分</span>
          </div>
          <div class="stat-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,2 16,8 22,8"/>
            </svg>
            <span>{{ product.sales }}+ 销量</span>
          </div>
          <div class="stat-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>正品保证</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-section">
        <button class="add-cart-btn" @click="addToCart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          加入购物车
        </button>
        <button class="buy-now-btn" @click="buyNow">
          立即购买
        </button>
      </div>

      <!-- Product Params -->
      <section class="params-section">
        <h3 class="section-title">产品参数</h3>
        <div class="params-grid">
          <div class="param-item">
            <span class="param-label">分类</span>
            <span class="param-value">{{ product.category }}</span>
          </div>
          <div class="param-item">
            <span class="param-label">品牌</span>
            <span class="param-value">官方正品</span>
          </div>
          <div class="param-item">
            <span class="param-label">服务</span>
            <span class="param-value">7天无理由退换</span>
          </div>
          <div class="param-item">
            <span class="param-label">物流</span>
            <span class="param-value">顺丰包邮</span>
          </div>
        </div>
      </section>

      <!-- Product Intro -->
      <section class="intro-section">
        <h3 class="section-title">产品介绍</h3>
        <div class="intro-content">
          <p>{{ product.description }}</p>
          <p>精选优质材料，工艺精湛，品质保证。我们致力于为您提供最优质的产品和服务，期待您的选购！</p>
        </div>
      </section>
    </main>

    <!-- Cart Toast -->
    <Transition name="toast">
      <div v-if="showCartToast" class="cart-toast">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
        已加入购物车
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* CSS Variables - Modern Theme */
:root {
  --bg-primary: #0a0e27;
  --bg-secondary: #1a1f3a;
  --bg-card: #ffffff;
  --text-primary: #1a1a2e;
  --text-secondary: #6b6b7b;
  --text-muted: #a8a8b8;
  --accent-primary: #667eea;
  --accent-secondary: #764ba2;
  --accent-glow: rgba(102, 126, 234, 0.4);
  --success: #10b981;
  --border-color: rgba(255, 255, 255, 0.1);
  --radius-lg: 16px;
  --radius-md: 12px;
  --radius-sm: 8px;
}

.product-detail-page {
  min-height: 100vh;
  background: 
    radial-gradient(ellipse at top left, rgba(0, 120, 255, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0d1025 100%);
  position: relative;
  padding-bottom: 100px;
}

/* Tech Grid Background */
.tech-grid {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(0, 120, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 120, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
  z-index: 0;
}

/* Header */
.detail-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: rgba(10, 14, 39, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-color);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.more-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
}

.more-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 16px;
  color: rgba(255, 255, 255, 0.6);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Product Content */
.product-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 20px;
}

/* Image Section */
.image-section {
  margin-bottom: 24px;
}

.image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  animation: fadeInUp 0.5s ease-out;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.image-wrapper:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
}

.category-badge {
  display: inline-block;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  border-radius: 20px;
  box-shadow: 0 4px 15px var(--accent-glow);
}

/* Info Section */
.info-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 20px;
  animation: fadeInUp 0.5s ease-out 0.1s both;
}

.product-header {
  margin-bottom: 16px;
}

.product-name {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px 0;
  line-height: 1.3;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  color: #ff9800;
  font-size: 16px;
  letter-spacing: 2px;
}

.rating-value {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.product-price-row {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 16px;
}

.price {
  font-size: 32px;
  font-weight: 700;
  color: #e53e3e;
}

.sales {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.product-description {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
}

.product-stats {
  display: flex;
  gap: 24px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.stat-item svg {
  color: var(--accent-primary);
}

/* Action Section */
.action-section {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  animation: fadeInUp 0.5s ease-out 0.2s both;
}

.add-cart-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  font-size: 15px;
  font-weight: 600;
  color: var(--accent-primary);
  background: rgba(102, 126, 234, 0.1);
  border: 2px solid var(--accent-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.25s ease;
}

.add-cart-btn:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.add-cart-btn:active {
  transform: translateY(0);
}

.buy-now-btn {
  flex: 1;
  padding: 16px 24px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.25s ease;
}

.buy-now-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--accent-glow);
}

.buy-now-btn:active {
  transform: translateY(0);
}

/* Params Section */
.params-section, .intro-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 20px;
  animation: fadeInUp 0.5s ease-out 0.3s both;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.params-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.param-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.param-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.param-value {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

/* Intro Section */
.intro-content p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin: 0 0 12px 0;
}

.intro-content p:last-child {
  margin-bottom: 0;
}

/* Toast */
.cart-toast {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background: var(--success);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);
  z-index: 1000;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .detail-header {
    padding: 12px 16px;
  }
  
  .product-content {
    padding: 16px;
  }
  
  .product-name {
    font-size: 20px;
  }
  
  .price {
    font-size: 28px;
  }
  
  .product-stats {
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .action-section {
    flex-direction: column;
  }
  
  .params-grid {
    grid-template-columns: 1fr;
  }
}
</style>
