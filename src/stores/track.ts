import { DEFAULT_MAX_FRAME_COUNT, FPS, MAX_FRAME_WIDTH } from '@/config'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { usePlayerStore } from './player'
import type { Millisecond } from '@/types/general'
import { type Track } from '@/types/track'
import { MainTrack } from '@/services/track/main-track'

export const useTrackStore = defineStore('track', () => {
  const playerStore = usePlayerStore()

  const scaleLevel = ref(0)
  const maxFrameCount = ref(DEFAULT_MAX_FRAME_COUNT)
  /**
   * timelineRuler 不需要监听 Resize 实时变动，只在需要的时候手动触发更新宽度
   * 这时为了保证 frameWidth 不会频繁更新
   */
  const timelineRulerWidth = ref(0)
  const scrollbarContainerWidth = ref(0)
  const scrollLeft = ref(0)

  const trackList = ref<Track[]>([MainTrack.create()])

  const minFrameWidth = computed(() => {
    if (timelineRulerWidth.value === 0) {
      return 0
    }
    // 一帧的最小宽度
    return timelineRulerWidth.value / maxFrameCount.value
  })

  const scaleRatio = computed(() => {
    // 缩放到最大时需要放大的倍数
    const base = Math.pow(MAX_FRAME_WIDTH / minFrameWidth.value, 1 / 100)
    return Math.pow(base, scaleLevel.value)
  })

  const frameWidth = computed(() => minFrameWidth.value * scaleRatio.value)

  const trackWidth = computed(() => frameWidth.value * maxFrameCount.value)

  const scrollLeftTrackWidth = computed(() =>
    scrollbarContainerWidth.value > 0
      ? (scrollLeft.value / scrollbarContainerWidth.value) * trackWidth.value
      : 0,
  )

  const scrollbarPercentage = computed(() => scrollbarContainerWidth.value / trackWidth.value)

  const scrollbarWidth = computed(() => scrollbarPercentage.value * scrollbarContainerWidth.value)

  const maxScrollLeft = computed(() =>
    Math.ceil(scrollbarContainerWidth.value - scrollbarWidth.value),
  )

  watch(scaleRatio, (newRatio, oldRatio) => {
    /**
     * 时间刻度缩放时以时间光标作为缩放原点
     */
    const ratioToScrollbarWidth = (scaleRatio: number) => {
      const frameWidth = minFrameWidth.value * scaleRatio
      const trackWidth = frameWidth * maxFrameCount.value
      return scrollbarContainerWidth.value * (scrollbarContainerWidth.value / trackWidth)
    }
    const cursorLeftPercent = (scaleRatio: number) => {
      const frameWidth = minFrameWidth.value * scaleRatio
      const trackWidth = frameWidth * maxFrameCount.value
      const scrollLeftTrackWidth = (scrollLeft.value / scrollbarContainerWidth.value) * trackWidth
      const leftPercent =
        (frameWidth * playerStore.currentFrame - scrollLeftTrackWidth) /
        scrollbarContainerWidth.value
      return leftPercent
    }
    const barDiffWidth = ratioToScrollbarWidth(oldRatio) - ratioToScrollbarWidth(newRatio)
    const leftPercent = cursorLeftPercent(oldRatio)

    setScrollLeft(scrollLeft.value + barDiffWidth * leftPercent)
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

  function durationToWidth(duration: Millisecond) {
    const frameCount = (duration / 1000) * FPS
    return frameCount * frameWidth.value
  }

  function frameToPixel(frame: number) {
    return frame * frameWidth.value
  }

  function pixelToFrame(pixel: number) {
    return Math.round(pixel / frameWidth.value)
  }

  return {
    scaleLevel,
    maxFrameCount,
    timelineRulerWidth,
    scrollbarContainerWidth,
    scrollLeft,
    trackList,

    frameWidth,
    trackWidth,
    scrollLeftTrackWidth,
    scrollbarPercentage,
    scrollbarWidth,
    maxScrollLeft,

    setScaleLevel,
    setMaxFrameCount,
    setTimelineRulerWidth,
    setScrollbarContainerWidth,
    setScrollLeft,

    durationToWidth,
    frameToPixel,
    pixelToFrame,
  }
})
