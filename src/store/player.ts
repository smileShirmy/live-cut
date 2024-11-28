import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const currentFrame = ref(30)

  return {
    currentFrame,
  }
})
