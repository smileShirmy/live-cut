import { DEFAULT_MAX_FRAME_COUNT, MAX_FRAME_WIDTH } from '@/config'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTrackStore = defineStore('track', () => {
  const scaleLevel = ref(10)
  const maxFrameCount = ref(DEFAULT_MAX_FRAME_COUNT)
  /**
   * timelineRuler 不需要监听 Resize 实时变动，只在需要的时候手动触发更新宽度
   * 这时为了保证 frameWidth 不会频繁更新
   */
  const timelineRulerWidth = ref(0)
  const scrollbarContainerWidth = ref(0)
  const scrollLeft = ref(0)

  const frameWidth = computed(() => {
    if (timelineRulerWidth.value === 0) {
      return 0
    }
    // 一帧的最小宽度
    const minFrameWidth = timelineRulerWidth.value / maxFrameCount.value

    // 缩放到最大时需要放大的倍数
    const base = Math.pow(MAX_FRAME_WIDTH / minFrameWidth, 1 / 100)
    const scaleRatio = Math.pow(base, scaleLevel.value)
    return minFrameWidth * scaleRatio
  })

  const trackWidth = computed(() => {
    return frameWidth.value * maxFrameCount.value
  })

  const scrollLeftTrackWidth = computed(() => {
    return scrollbarContainerWidth.value > 0
      ? (scrollLeft.value / scrollbarContainerWidth.value) * trackWidth.value
      : 0
  })

  function setScaleLevel(level: number) {
    scaleLevel.value = level
  }

  function setMaxFrameCount(frameCount: number) {
    maxFrameCount.value = frameCount
  }

  function setTimelineRulerWidth(width: number) {
    timelineRulerWidth.value = width
  }

  function setScrollbarContainerWidth(width: number) {
    scrollbarContainerWidth.value = width
  }

  function setScrollLeft(left: number) {
    scrollLeft.value = left
  }

  return {
    scaleLevel,
    maxFrameCount,
    timelineRulerWidth,
    scrollbarContainerWidth,
    scrollLeft,

    frameWidth,
    trackWidth,
    scrollLeftTrackWidth,

    setScaleLevel,
    setMaxFrameCount,
    setTimelineRulerWidth,
    setScrollbarContainerWidth,
    setScrollLeft,
  }
})
