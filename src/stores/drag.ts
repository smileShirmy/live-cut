import { type DragState } from '@/types/drag'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDragStore = defineStore('drag', () => {
  const dragState = ref<DragState | null>(null)

  function setDragState(state: DragState | null) {
    dragState.value = state
  }

  return {
    dragState,

    setDragState,
  }
})
