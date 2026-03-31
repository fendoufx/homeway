<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import CaptchaVerify from '@/components/CaptchaVerify.vue'

const router = useRouter()

interface LoginForm {
  username: string
  password: string
  captcha: string
}

const form = reactive<LoginForm>({
  username: '',
  password: '',
  captcha: '',
})

const errors = reactive({
  username: '',
  password: '',
  captcha: '',
})

const loading = ref(false)
const captchaRef = ref<InstanceType<typeof CaptchaVerify> | null>(null)

const validateUsername = (): boolean => {
  if (!form.username.trim()) {
    errors.username = '请输入用户名'
    return false
  }
  if (form.username.length < 3) {
    errors.username = '用户名至少3个字符'
    return false
  }
  if (form.username.length > 20) {
    errors.username = '用户名不能超过20个字符'
    return false
  }
  errors.username = ''
  return true
}

const validatePassword = (): boolean => {
  if (!form.password) {
    errors.password = '请输入密码'
    return false
  }
  if (form.password.length < 6) {
    errors.password = '密码至少6个字符'
    return false
  }
  errors.password = ''
  return true
}

const validateCaptcha = (): boolean => {
  if (!form.captcha) {
    errors.captcha = '请输入验证码'
    return false
  }
  if (captchaRef.value && !captchaRef.value.verify(form.captcha)) {
    errors.captcha = '验证码错误'
    captchaRef.value.refresh()
    form.captcha = ''
    return false
  }
  errors.captcha = ''
  return true
}

const validateForm = (): boolean => {
  const isUsernameValid = validateUsername()
  const isPasswordValid = validatePassword()
  const isCaptchaValid = validateCaptcha()
  return isUsernameValid && isPasswordValid && isCaptchaValid
}

const handleLogin = async (): Promise<void> => {
  if (!validateForm()) {
    return
  }

  loading.value = true
  try {
    // 模拟登录请求
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // 这里应该调用实际的登录API
    console.log('Login attempt:', {
      username: form.username,
      password: form.password,
    })

    // 登录成功，跳转到产品页面
    router.push('/products')
  } catch (error) {
    console.error('Login error:', error)
    errors.captcha = '登录失败，请稍后重试'
    captchaRef.value?.refresh()
    form.captcha = ''
  } finally {
    loading.value = false
  }
}

const goToRegister = (): void => {
  router.push('/register')
}

const handleUsernameBlur = (): void => {
  if (form.username) validateUsername()
}

const handlePasswordBlur = (): void => {
  if (form.password) validatePassword()
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>欢迎回来</h1>
        <p>登录到您的账户</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="请输入用户名"
            :class="{ 'error': errors.username }"
            @blur="handleUsernameBlur"
          />
          <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            :class="{ 'error': errors.password }"
            @blur="handlePasswordBlur"
          />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label for="captcha">验证码</label>
          <div class="captcha-wrapper">
            <input
              id="captcha"
              v-model="form.captcha"
              type="text"
              placeholder="请输入验证码"
              :class="{ 'error': errors.captcha }"
              maxlength="4"
            />
            <CaptchaVerify ref="captchaRef" v-model="form.captcha" />
          </div>
          <span v-if="errors.captcha" class="error-message">{{ errors.captcha }}</span>
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading" class="loading-spinner"></span>
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <div class="login-footer">
          <span>还没有账户？</span>
          <a href="#" class="register-link" @click.prevent="goToRegister">立即注册</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 科技风格背景 - 深色渐变 + 网格 + 光效 */
  background: 
    radial-gradient(ellipse at top left, rgba(0, 120, 255, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at center, rgba(0, 200, 255, 0.1) 0%, transparent 60%),
    linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0d1025 100%);
  position: relative;
  overflow: hidden;
  width: 100vw;
  margin: 0;
  padding: 0;
}

/* 科技网格背景 */
.login-container::before {
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
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(30px, 30px); }
}

/* 科技线条装饰 */
.login-container::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 800px;
  transform: translate(-50%, -50%);
  background: 
    radial-gradient(circle at 30% 30%, rgba(0, 200, 255, 0.12) 0%, transparent 40%),
    radial-gradient(circle at 70% 70%, rgba(138, 43, 226, 0.1) 0%, transparent 40%),
    radial-gradient(circle, rgba(0, 120, 255, 0.08) 0%, transparent 60%);
  pointer-events: none;
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.05); }
}

.login-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 36px;
}

.login-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.login-header p {
  font-size: 14px;
  color: #8a8a9b;
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
  font-size: 13px;
  font-weight: 500;
  color: #3a3a4a;
  margin: 0;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  color: #1a1a2e;
  background-color: #f8f9fa;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.2s ease;
  outline: none;
  box-sizing: border-box;
}

.form-group input::placeholder {
  color: #a8a8b8;
}

.form-group input:focus {
  background-color: #ffffff;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input.error {
  border-color: #e53e3e;
  background-color: #fff5f5;
}

.form-group input.error:focus {
  border-color: #e53e3e;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
}

.error-message {
  font-size: 12px;
  color: #e53e3e;
  margin: 0;
}

.captcha-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.captcha-wrapper input {
  flex: 1;
}

.login-btn {
  margin-top: 8px;
  padding: 14px;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-right: 8px;
  vertical-align: middle;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.login-footer {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #8a8a9b;
}

.login-footer span {
  margin-right: 4px;
}

.register-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.register-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-card {
    padding: 36px 24px;
  }

  .login-header h1 {
    font-size: 24px;
  }
}
</style>