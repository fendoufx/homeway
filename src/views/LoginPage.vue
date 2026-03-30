<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CaptchaVerify from '@/components/CaptchaVerify.vue'

const router = useRouter()

const formData = ref({
  username: '',
  password: '',
  captcha: '',
})

const errors = ref({
  username: '',
  password: '',
  captcha: '',
})

const captchaRef = ref<InstanceType<typeof CaptchaVerify> | null>(null)
const isLoading = ref(false)
const captchaVerified = ref(false)

const validateForm = (): boolean => {
  errors.value = { username: '', password: '', captcha: '' }
  let isValid = true

  if (!formData.value.username.trim()) {
    errors.value.username = '请输入用户名'
    isValid = false
  } else if (formData.value.username.length < 3) {
    errors.value.username = '用户名至少3个字符'
    isValid = false
  }

  if (!formData.value.password) {
    errors.value.password = '请输入密码'
    isValid = false
  } else if (formData.value.password.length < 6) {
    errors.value.password = '密码至少6个字符'
    isValid = false
  }

  if (!formData.value.captcha.trim()) {
    errors.value.captcha = '请输入验证码'
    isValid = false
  } else if (!captchaVerified.value) {
    errors.value.captcha = '验证码错误'
    isValid = false
  }

  return isValid
}

const handleCaptchaVerify = (success: boolean) => {
  captchaVerified.value = success
  if (success) {
    errors.value.captcha = ''
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true

  // 模拟登录请求
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('登录成功', formData.value)
    router.push('/')
  } catch (error) {
    console.error('登录失败', error)
  } finally {
    isLoading.value = false
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1 class="title">欢迎回来</h1>
        <p class="subtitle">登录您的账号</p>
      </div>

      <form class="login-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="formData.username"
            type="text"
            class="form-input"
            :class="{ 'error': errors.username }"
            placeholder="请输入用户名"
            autocomplete="username"
          />
          <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            class="form-input"
            :class="{ 'error': errors.password }"
            placeholder="请输入密码"
            autocomplete="current-password"
          />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label for="captcha">验证码</label>
          <CaptchaVerify
            ref="captchaRef"
            v-model="formData.captcha"
            @verify="handleCaptchaVerify"
          />
          <input
            id="captcha"
            v-model="formData.captcha"
            type="text"
            class="form-input captcha-input"
            :class="{ 'error': errors.captcha }"
            placeholder="请输入验证码"
            maxlength="4"
          />
          <span v-if="errors.captcha" class="error-message">{{ errors.captcha }}</span>
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="isLoading" class="loading-spinner"></span>
          <span v-else>登录</span>
        </button>

        <div class="form-footer">
          <span>还没有账号？</span>
          <a href="javascript:void(0)" class="register-link" @click="goToRegister">立即注册</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e8f4fd 0%, #f5f7fa 50%, #eef2f7 100%);
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px 0;
}

.subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.form-input {
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: #fafbfc;
}

.form-input:focus {
  outline: none;
  border-color: #4a90d9;
  box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.1);
  background: white;
}

.form-input.error {
  border-color: #ef4444;
}

.form-input.error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.captcha-input {
  margin-top: 8px;
}

.error-message {
  font-size: 12px;
  color: #ef4444;
}

.submit-btn {
  padding: 14px 24px;
  background: linear-gradient(135deg, #4a90d9 0%, #3a7bc8 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(74, 144, 217, 0.3);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.form-footer {
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}

.register-link {
  color: #4a90d9;
  text-decoration: none;
  margin-left: 4px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.register-link:hover {
  color: #3a7bc8;
  text-decoration: underline;
}
</style>
