import { cloneElement } from '@/services/helpers/dom'
import { defineStore } from 'pinia'

function getPosition(event: MouseEvent | TouchEvent): { x: number; y: number } {
  const { clientX, clientY } = event instanceof TouchEvent ? event.touches[0] : event
  return { x: clientX, y: clientY }
}

export const useDragStore = defineStore('drag', () => {
  let dragging = false
  let clone: HTMLElement | null = null

  function onDragging(event: MouseEvent | TouchEvent) {
    if (dragging && clone) {
      /**
       * 更新拖拽元素的样式
       */
      const { x, y } = getPosition(event)
      clone.style.position = 'fixed'
      clone.style.pointerEvents = 'none'
      clone.style.top = `${y}px`
      clone.style.left = `${x}px`
      clone.style.opacity = '0.7'
    }
  }

  function onDragEnd() {
    clone?.remove()
    dragging = false

    window.removeEventListener('mousemove', onDragging)
    window.removeEventListener('touchmove', onDragging)
    window.removeEventListener('mouseup', onDragEnd)
    window.removeEventListener('touchend', onDragEnd)
    window.removeEventListener('contextmenu', onDragEnd)
  }

  function onDragStart(event: MouseEvent | TouchEvent, dragTarget: HTMLElement) {
    event.preventDefault()

    dragging = true
    clone = cloneElement(dragTarget)
    document.body.appendChild(clone)

    window.addEventListener('mousemove', onDragging)
    window.addEventListener('touchmove', onDragging)
    window.addEventListener('mouseup', onDragEnd)
    window.addEventListener('touchend', onDragEnd)
    window.addEventListener('contextmenu', onDragEnd)
  }

  return {
    onDragStart,
  }
})
