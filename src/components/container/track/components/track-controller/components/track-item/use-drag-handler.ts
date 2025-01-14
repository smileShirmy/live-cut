import { useTrackStore } from '@/stores/track'

export const useDragHandler = (
  startPositionFrame: number,
  setFrame: (frame: number) => void,
  dragEnd: () => void,
) => {
  const trackStore = useTrackStore()

  let dragging = false
  let startX = 0
  let currentX = 0
  let startPosition = 0
  let newPosition = 0
  let isClick = false

  function getClientX(event: MouseEvent | TouchEvent) {
    if (event instanceof TouchEvent) {
      return event.touches[0].clientX
    }
    return event.clientX
  }

  function onDragStart(event: MouseEvent | TouchEvent) {
    dragging = true
    isClick = true
    startX = getClientX(event)
    startPosition = trackStore.frameToPixel(startPositionFrame)
    newPosition = startPosition
  }

  function onDragging(event: MouseEvent | TouchEvent) {
    if (dragging) {
      currentX = getClientX(event)
      const diff = currentX - startX
      newPosition = startPosition + diff
      setPosition(newPosition)
    }
  }

  function setPosition(newPosition: number) {
    const frame = trackStore.pixelToFrame(newPosition)
    setFrame(frame)
  }

  function onDragEnd() {
    /*
     * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
     * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同j一个 DOM 上
     */
    setTimeout(() => {
      dragging = false
      if (!isClick) {
        setPosition(newPosition)
      }
      dragEnd()
    }, 0)
    window.removeEventListener('mousemove', onDragging)
    window.removeEventListener('touchmove', onDragging)
    window.removeEventListener('mouseup', onDragEnd)
    window.removeEventListener('touchend', onDragEnd)
    window.removeEventListener('contextmenu', onDragEnd)
  }

  function onHandlerDown(event: MouseEvent | TouchEvent) {
    event.stopPropagation()
    event.preventDefault()

    onDragStart(event)
    window.addEventListener('mousemove', onDragging)
    window.addEventListener('touchmove', onDragging)
    window.addEventListener('mouseup', onDragEnd)
    window.addEventListener('touchend', onDragEnd)
    window.addEventListener('contextmenu', onDragEnd)
  }

  return {
    onHandlerDown,
  }
}
