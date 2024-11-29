import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const currentFrame = ref(30)

  function setCurrentFrame(frame: number) {
    currentFrame.value = frame
  }

  return {
    currentFrame,

    setCurrentFrame,
  }
})
