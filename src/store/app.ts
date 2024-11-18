import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const resourceVisible = ref(true)

  function toggleResourceVisible(visible: boolean) {
    resourceVisible.value = visible
  }

  return {
    resourceVisible,
    toggleResourceVisible,
  }
})
