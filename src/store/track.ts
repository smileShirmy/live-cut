import { DEFAULT_MAX_FRAME_COUNT } from '@/config'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTrackStore = defineStore('track', () => {
  const scaleLevel = ref(0)
  const maxFrameCount = ref(DEFAULT_MAX_FRAME_COUNT)
  const frameWidth = ref(0)

  function setScaleLevel(level: number) {
    scaleLevel.value = level
  }

  function setMaxFrameCount(frameCount: number) {
    maxFrameCount.value = frameCount
  }

  return {
    scaleLevel,
    maxFrameCount,
    setScaleLevel,
    setMaxFrameCount,
  }
})
