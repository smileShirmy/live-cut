<script setup lang="ts">
import { MAX_FRAME_WIDTH } from '@/config'
import { useTrackStore } from '@/store/track'
import { useResizeObserver, watchThrottled } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref, onMounted, computed } from 'vue'
import { formatLongScaleTime, generateScaleOptions } from './helper'

const RATIO = window.devicePixelRatio
const BACKGROUND_COLOR = 'transparent' // 背景色
const SHORT_SCALE_COLOR = '#666' // 短刻度的颜色
const LONG_SCALE_COLOR = '#999' // 长刻度颜色
const SCALE_WIDTH = 1 // 刻度的宽度
const SHORT_SCALE_HEIGHT = 7
const LONG_SCALE_HEIGHT = 13
const TEXT_TRANSLATE_X = 4
const TEXT_TRANSLATE_Y = LONG_SCALE_HEIGHT + 2
const TEXT_COLOR = '#999'
const TEXT_FONT = `${13 * RATIO}px sans-serif`

const timelineRulerRef = ref<HTMLCanvasElement>()
const trackStore = useTrackStore()
const trackStoreRefs = storeToRefs(useTrackStore())
const timelineRulerWidth = ref(0)

const frameWidth = computed(() => {
  // 一帧的最小宽度
  const minFrameWidth = timelineRulerWidth.value / trackStore.maxFrameCount

  // 缩放到最大时需要放大的倍数
  const base = Math.pow(MAX_FRAME_WIDTH / minFrameWidth, 1 / 100)
  const scaleRatio = Math.pow(base, trackStore.scaleLevel)
  return minFrameWidth * scaleRatio
})

watchThrottled([trackStoreRefs.scaleLevel, timelineRulerWidth], render, {
  throttle: 100,
  trailing: true,
  immediate: true,
})

function render() {
  if (!timelineRulerRef.value) {
    return
  }
  const ctx = timelineRulerRef.value.getContext('2d')
  if (!ctx) {
    return
  }

  const { width: rulerWidth, height: rulerHeight } = timelineRulerRef.value.getBoundingClientRect()
  const { scaleWidth, parts, unit, type } = generateScaleOptions(frameWidth.value)

  // 设置画布的宽度和高度
  ctx.canvas.width = rulerWidth
  ctx.canvas.height = rulerHeight

  // 清空画布
  ctx.scale(RATIO, RATIO)
  ctx.clearRect(0, 0, rulerWidth, rulerHeight)

  // canvas 背景色
  ctx.fillStyle = BACKGROUND_COLOR
  ctx.fillRect(0, 0, rulerWidth, rulerHeight)

  ctx.lineWidth = SCALE_WIDTH

  ctx.beginPath()

  ctx.fillStyle = TEXT_COLOR
  ctx.font = TEXT_FONT

  // prevent canvas 1px line blurry
  const scaleCount = Math.floor(rulerWidth / scaleWidth)
  for (let i = 0; i < scaleCount; i += 1) {
    const x = Math.round(scaleWidth * i) + 0.5

    ctx.moveTo(x, 0)

    if (i % parts === 0) {
      ctx.strokeStyle = LONG_SCALE_COLOR
      ctx.save()
      ctx.translate(x + TEXT_TRANSLATE_X, TEXT_TRANSLATE_Y)
      const text = formatLongScaleTime(i, unit, type)
      ctx.fillText(text, 0, 0)
      ctx.restore()
      ctx.lineTo(x, LONG_SCALE_HEIGHT)
    } else {
      ctx.strokeStyle = SHORT_SCALE_COLOR
      ctx.lineTo(x, SHORT_SCALE_HEIGHT)
    }
  }

  ctx.stroke()

  ctx.closePath()

  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

onMounted(() => {
  useResizeObserver(timelineRulerRef.value, ([{ contentRect }]) => {
    timelineRulerWidth.value = contentRect.width
  })
})
</script>

<template>
  <div class="timeline-ruler-container">
    <canvas ref="timelineRulerRef" class="timeline-ruler"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.timeline-ruler-container {
  display: flex;
  height: 30px;

  .timeline-ruler {
    flex: 1;
    margin-left: 80px;
  }
}
</style>
