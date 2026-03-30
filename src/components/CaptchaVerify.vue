<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface CaptchaVerifyEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'verify', success: boolean): void
}

interface CaptchaVerifyProps {
  modelValue?: string
  length?: number
}

const props = withDefaults(defineProps<CaptchaVerifyProps>(), {
  modelValue: '',
  length: 4,
})

const emit = defineEmits<CaptchaVerifyEmits>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const captchaCode = ref('')

const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'

const generateCode = (): string => {
  let code = ''
  for (let i = 0; i < props.length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return code
}

const drawCanvas = (code: string): void => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 设置canvas尺寸
  const width = 120
  const height = 40
  canvas.width = width
  canvas.height = height

  // 清空画布
  ctx.fillStyle = '#f0f2f5'
  ctx.fillRect(0, 0, width, height)

  // 绘制背景干扰线
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = `rgba(${Math.random() * 100 + 150}, ${Math.random() * 100 + 150}, ${Math.random() * 100 + 200}, 0.3)`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(Math.random() * width, Math.random() * height)
    ctx.lineTo(Math.random() * width, Math.random() * height)
    ctx.stroke()
  }

  // 绘制干扰点
  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 150}, ${Math.random() * 100 + 180}, 0.4)`
    ctx.beginPath()
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2, 0, Math.PI * 2)
    ctx.fill()
  }

  // 绘制验证码文字
  const fontSize = 24
  ctx.font = `bold ${fontSize}px "Microsoft YaHei", "Segoe UI", sans-serif`
  
  for (let i = 0; i < code.length; i++) {
    const char = code[i]
    const charWidth = ctx.measureText(char).width
    const x = 15 + i * ((width - 30) / (code.length - 1 || 1))
    const y = height / 2 + fontSize / 3
    
    // 随机旋转角度
    const rotation = (Math.random() - 0.5) * 0.4
    
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)
    
    // 渐变色文字
    const hue = Math.random() * 40 + 200 // 蓝色系
    ctx.fillStyle = `hsl(${hue}, 70%, 45%)`
    ctx.fillText(char, 0, 0)
    
    ctx.restore()
  }
}

const refreshCaptcha = (): void => {
  captchaCode.value = generateCode()
  drawCanvas(captchaCode.value)
}

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const verify = (code: string): boolean => {
  const success = code.toLowerCase() === captchaCode.value.toLowerCase()
  emit('verify', success)
  return success
}

defineExpose({
  verify,
  refresh: refreshCaptcha,
  getCode: () => captchaCode.value,
})

onMounted(() => {
  refreshCaptcha()
})
</script>

<template>
  <div class="captcha-verify">
    <canvas 
      ref="canvasRef" 
      class="captcha-canvas"
      @click="refreshCaptcha"
      title="点击刷新验证码"
    />
    <button 
      type="button" 
      class="refresh-btn" 
      @click="refreshCaptcha"
      title="刷新验证码"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.captcha-verify {
  display: flex;
  align-items: center;
  gap: 8px;
}

.captcha-canvas {
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.captcha-canvas:hover {
  transform: scale(1.02);
}

.refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background-color: #e8f4fd;
  color: #4a90d9;
  cursor: pointer;
  transition: all 0.2s ease;
}

.refresh-btn:hover {
  background-color: #d4e9fc;
  color: #3a7bc8;
}

.refresh-btn:active {
  transform: rotate(180deg);
}
</style>