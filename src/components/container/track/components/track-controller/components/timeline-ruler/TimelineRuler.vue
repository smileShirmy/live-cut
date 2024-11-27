<script setup lang="ts">
import { useTrackStore } from '@/store/track'
import { useResizeObserver, useThrottleFn, watchThrottled } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { formatLongScaleTime, generateScaleOptions } from './helper'

const RATIO = window.devicePixelRatio
const BACKGROUND_COLOR = 'transparent' // 背景色
const SHORT_SCALE_COLOR = '#666' // 短刻度的颜色
const LONG_SCALE_COLOR = '#999' // 长刻度颜色
const SCALE_WIDTH = 1 // 刻度的宽度
const SHORT_SCALE_HEIGHT = 7
const LONG_SCALE_HEIGHT = 13
const TEXT_TRANSLATE_X = 4
const TEXT_TRANSLATE_Y = LONG_SCALE_HEIGHT + 6
const TEXT_COLOR = '#999'
const TEXT_FONT = `${13 * RATIO}px sans-serif`

const timelineRulerRef = ref<HTMLCanvasElement>()
const trackStore = useTrackStore()
const trackStoreRefs = storeToRefs(useTrackStore())

watchThrottled([trackStoreRefs.scaleLevel, trackStoreRefs.scrollLeft], render, {
  throttle: 100,
  trailing: true,
  immediate: true,
})

function render() {
  if (trackStore.frameWidth <= 0) {
    return
  }
  if (!timelineRulerRef.value) {
    return
  }
  const ctx = timelineRulerRef.value.getContext('2d')
  if (!ctx) {
    return
  }

  const { width: rulerWidth, height: rulerHeight } = timelineRulerRef.value.getBoundingClientRect()
  const { scaleWidth, parts, unit, type } = generateScaleOptions(trackStore.frameWidth)
  const scrollLeftScaleCount = Math.floor(trackStore.scrollLeftTrackWidth / scaleWidth)
  const startOffset = -(trackStore.scrollLeftTrackWidth % scaleWidth)

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
  ctx.strokeStyle = SHORT_SCALE_COLOR
  const scaleCount = Math.floor(rulerWidth / scaleWidth)
  const longScaleList: { x: number; i: number }[] = []
  for (let i = 0; i < scaleCount; i += 1) {
    // prevent canvas 1px line blurry
    const x = startOffset + Math.round(scaleWidth * i) + 0.5

    if ((i + scrollLeftScaleCount) % parts === 0) {
      longScaleList.push({ x, i: i + scrollLeftScaleCount })
      continue
    }

    ctx.moveTo(x, 0)
    ctx.lineTo(x, SHORT_SCALE_HEIGHT)
  }
  ctx.stroke()
  ctx.closePath()

  ctx.beginPath()
  ctx.strokeStyle = LONG_SCALE_COLOR
  ctx.fillStyle = TEXT_COLOR
  ctx.font = TEXT_FONT
  for (const { x, i } of longScaleList) {
    ctx.moveTo(x, 0)
    ctx.save()
    ctx.translate(x + TEXT_TRANSLATE_X, TEXT_TRANSLATE_Y)
    const text = formatLongScaleTime(i, unit, type)
    ctx.fillText(text, 0, 0)
    ctx.restore()
    ctx.lineTo(x, LONG_SCALE_HEIGHT)
  }

  ctx.stroke()
  ctx.closePath()

  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

const onResize = useThrottleFn<
  (entries: ReadonlyArray<ResizeObserverEntry>, observer: ResizeObserver) => void
>(render, 50, true)

useResizeObserver(timelineRulerRef, onResize)

onMounted(() => {
  if (timelineRulerRef.value) {
    const { width } = timelineRulerRef.value.getBoundingClientRect()
    trackStore.setTimelineRulerWidth(width)
    render()
  }
})
</script>

<template>
  <div class="timeline-ruler-container">
    <canvas ref="timelineRulerRef" class="timeline-ruler"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.timeline-ruler-container {
  height: 30px;

  .timeline-ruler {
    margin-left: 80px;
    width: calc(100% - 80px);
    height: 100%;
  }
}
</style>
