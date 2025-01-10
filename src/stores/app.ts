import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const resourceVisible = ref(true)
  const attributeVisible = ref(true)

  function setResourceVisible(visible: boolean) {
    resourceVisible.value = visible
  }

  function setAttributeVisible(visible: boolean) {
    attributeVisible.value = visible
  }

  return {
    resourceVisible,
    attributeVisible,
    setResourceVisible,
    setAttributeVisible,
  }
})
