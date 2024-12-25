import { cloneElement } from '@/services/helpers/dom'
import { emitter, Events } from '@/services/mitt/emitter'
import type { DropArea, TrackPositionData } from '@/types/drag'
import type { ResourceData } from '@/types/resource'
import { defineStore } from 'pinia'

function getPosition(event: MouseEvent | TouchEvent): { x: number; y: number } {
  const { clientX, clientY } = event instanceof TouchEvent ? event.touches[0] : event
  return { x: clientX, y: clientY }
}

export const useDragStore = defineStore('drag', () => {
  let dragging = false
  let clone: HTMLElement | null = null
  let trackPositions: TrackPositionData[] = []
  let dropArea: DropArea = { top: 0, left: 0 }
  let dragData: ResourceData | null = null

  function setPositions(items: TrackPositionData[]) {
    trackPositions = items
  }

  function setDropArea(rect: DropArea) {
    dropArea = rect
  }

  /**
   * 获取当前所处轨道在 y 轴上的位置信息
   */
  function getTrackPositionData(y: number) {
    let target: TrackPositionData | null = null
    const len = trackPositions.length
    for (let i = 0; i < len; i += 1) {
      const cur = trackPositions[i]
      const next = trackPositions[i + 1]
      if (y >= cur.top) {
        if (!next || y < next.top) {
          target = cur
          break
        }
      }
    }
    return target
  }

  function appendClone(dragTarget: HTMLElement) {
    clone = cloneElement(dragTarget)
    document.body.appendChild(clone)
  }

  /**
   * 更新拖拽元素的样式
   */
  function updateCloneStyle(x: number, y: number) {
    if (clone) {
      clone.style.position = 'fixed'
      clone.style.pointerEvents = 'none'
      clone.style.top = `${y}px`
      clone.style.left = `${x}px`
      clone.style.opacity = '0.7'
    }
  }

  function onDragging(event: MouseEvent | TouchEvent) {
    if (!dragging || !dragData) return

    const { x, y } = getPosition(event)

    updateCloneStyle(x, y)

    // const item = getTrackPositionData(y)
    // if (item) {
    //   switch (item.type) {
    //     case value:
    //       break

    //     default:
    //       break
    //   }
    // }
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

  function onDragStart(
    event: MouseEvent | TouchEvent,
    dragTarget: HTMLElement,
    data: ResourceData,
  ) {
    event.preventDefault()

    dragging = true
    appendClone(dragTarget)

    dragData = data

    emitter.emit(Events.INIT_TRACK_POSITIONS)
    emitter.emit(Events.INIT_DRAG_RECT)

    window.addEventListener('mousemove', onDragging)
    window.addEventListener('touchmove', onDragging)
    window.addEventListener('mouseup', onDragEnd)
    window.addEventListener('touchend', onDragEnd)
    window.addEventListener('contextmenu', onDragEnd)
  }

  return {
    onDragStart,
    setPositions,
    setDropArea,
  }
})
