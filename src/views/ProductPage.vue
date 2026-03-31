<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { products as allProducts, type Product } from '@/data/products'

// 状态
const displayedProducts = ref<Product[]>([])
const loading = ref(false)
const hasMore = ref(true)
const currentCategory = ref('全部')
const categories = ['全部', '数码', '外设', '影音', '配件', '穿戴', '家居', '个护', '存储', '网络']

const PAGE_SIZE = 12

// 筛选后的产品
const filteredProducts = computed(() => {
  if (currentCategory.value === '全部') {
    return allProducts
  }
  return allProducts.filter(p => p.category === currentCategory.value)
})

// 加载更多
const loadMore = (): void => {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  
  // 模拟网络延迟
  setTimeout(() => {
    const start = displayedProducts.value.length
    const end = Math.min(start + PAGE_SIZE, filteredProducts.value.length)
    const newItems = filteredProducts.value.slice(start, end)
    
    displayedProducts.value = [...displayedProducts.value, ...newItems]
    hasMore.value = end < filteredProducts.value.length
    loading.value = false
  }, 500)
}

// 初始化加载
const initLoad = (): void => {
  displayedProducts.value = []
  hasMore.value = true
  loadMore()
}

// 滚动监听
const handleScroll = (): void => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  
  // 距离底部200px时触发加载
  if (scrollHeight - scrollTop - clientHeight < 200) {
    loadMore()
  }
}

// 分类切换
const selectCategory = (category: string): void => {
  currentCategory.value = category
  initLoad()
}

// 骨架屏数据
const skeletonArray = Array(12).fill(0)

onMounted(() => {
  initLoad()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="product-page">
    <div class="page-header">
      <h1>产品中心</h1>
      <p>发现科技之美</p>
    </div>
    
    <!-- 分类导航 -->
    <div class="category-nav">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="['category-btn', { active: currentCategory === cat }]"
        @click="selectCategory(cat)"
      >
        {{ cat }}
      </button>
    </div>
    
    <!-- 产品网格 -->
    <div class="product-grid">
      <!-- 骨架屏 -->
      <template v-if="loading && displayedProducts.length === 0">
        <div v-for="i in skeletonArray" :key="i" class="product-card skeleton">
          <div class="skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton-title"></div>
            <div class="skeleton-desc"></div>
            <div class="skeleton-footer">
              <div class="skeleton-price"></div>
              <div class="skeleton-btn"></div>
            </div>
          </div>
        </div>
      </template>
      
      <!-- 实际产品 -->
      <template v-else>
        <div
          v-for="product in displayedProducts"
          :key="product.id"
          class="product-card"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.name" loading="lazy" />
          </div>
          <div class="product-content">
            <span class="product-category">{{ product.category }}</span>
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-desc">{{ product.description }}</p>
            <div class="product-meta">
              <span class="product-price">¥{{ product.price }}</span>
              <div class="product-rating">
                <span class="star">★</span>
                <span>{{ product.rating }}</span>
              </div>
            </div>
            <div class="product-sales">已售 {{ product.sales }}+</div>
          </div>
        </div>
      </template>
    </div>
    
    <!-- 加载更多 -->
    <div v-if="loading && displayedProducts.length > 0" class="loading-more">
      <div class="loading-spinner"></div>
      <span>加载中...</span>
    </div>
    
    <!-- 没有更多 -->
    <div v-if="!hasMore && displayedProducts.length > 0" class="no-more">
      <span>已经到底啦</span>
    </div>
  </div>
</template>

<style scoped>
.product-page {
  min-height: 100vh;
  /* 科技风格背景 - 与登录页统一 */
  background: 
    radial-gradient(ellipse at top left, rgba(0, 120, 255, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at center, rgba(0, 200, 255, 0.1) 0%, transparent 60%),
    linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0d1025 100%);
  position: relative;
  padding: 40px 20px 60px;
}

/* 科技网格背景 */
.product-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(0, 120, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 120, 255, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.page-header h1 {
  font-size: 36px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 120, 255, 0.3);
}

.page-header p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

/* 分类导航 */
.category-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.category-btn {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border-color: rgba(102, 126, 234, 0.5);
}

.category-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

/* 产品网格 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* 产品卡片 */
.product-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  animation: fadeInUp 0.4s ease-out;
}

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

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f5f5f7;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-content {
  padding: 20px;
}

.product-category {
  display: inline-block;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 4px;
  margin-bottom: 10px;
}

.product-name {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.product-desc {
  font-size: 13px;
  color: #6b6b7b;
  margin: 0 0 16px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.product-price {
  font-size: 22px;
  font-weight: 700;
  color: #e53e3e;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #ff9800;
}

.product-rating .star {
  font-size: 16px;
}

.product-sales {
  font-size: 12px;
  color: #a8a8b8;
}

/* 骨架屏 */
.product-card.skeleton {
  pointer-events: none;
}

.skeleton-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-content {
  padding: 20px;
}

.skeleton-title {
  height: 20px;
  width: 70%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 12px;
}

.skeleton-desc {
  height: 14px;
  width: 90%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 16px;
}

.skeleton-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skeleton-price {
  height: 24px;
  width: 80px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-btn {
  height: 30px;
  width: 80px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px;
}

/* 加载更多 */
.loading-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px 0;
  color: rgba(255, 255, 255, 0.7);
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-more {
  text-align: center;
  padding: 40px 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 768px) {
  .product-page {
    padding: 20px 16px 40px;
  }
  
  .page-header h1 {
    font-size: 28px;
  }
  
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }
  
  .product-image {
    height: 140px;
  }
  
  .product-content {
    padding: 14px;
  }
  
  .product-name {
    font-size: 15px;
  }
  
  .product-price {
    font-size: 18px;
  }
}
</style>