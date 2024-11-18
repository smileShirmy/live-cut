import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const resourceVisible = ref(true)
  const attributeVisible = ref(true)

  function toggleResourceVisible(visible: boolean) {
    resourceVisible.value = visible
  }

  function toggleAttributeVisible(visible: boolean) {
    attributeVisible.value = visible
  }

  return {
    resourceVisible,
    attributeVisible,
    toggleResourceVisible,
    toggleAttributeVisible,
  }
})
