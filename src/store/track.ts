import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTrackStore = defineStore('track', () => {
  const scaleLevel = ref(0)

  function setScaleLevel(level: number) {
    scaleLevel.value = level
  }

  return {
    scaleLevel,
    setScaleLevel,
  }
})
