<script setup lang="ts">
import { computed, type ComputedRef, type CSSProperties } from 'vue'
import { useTrackStore } from '@/stores/track'
import { usePlayerStore } from '@/stores/player'
import { AUTO_SCROLL_SPEED, TRACK_RESOURCE_OFFSET_LEFT } from '@/config'

const trackStore = useTrackStore()
const playerStore = usePlayerStore()

let dragging = false
let startX = 0
let currentX = 0
let startPosition = 0
let newPosition = 0
let maxPosition = 0
let isClick = false
let scrollTimeout = 0

const left = computed(
  () => trackStore.frameWidth * playerStore.currentFrame - trackStore.scrollLeftTrackWidth,
)
const cursorStyle: ComputedRef<CSSProperties> = computed(() => {
  return {
    display: left.value < 0 ? 'none' : 'block',
    left: `${left.value + TRACK_RESOURCE_OFFSET_LEFT}px`,
  }
})

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
  startPosition = left.value
  newPosition = startPosition
  maxPosition = trackStore.timelineRulerWidth
  autoScroll()
}

function onDragging(event: MouseEvent | TouchEvent) {
  if (dragging) {
    currentX = getClientX(event)
    const diff = currentX - startX
    newPosition = startPosition + diff
    setCurrentFrame(newPosition)
  }
}

function autoScroll() {
  scrollTimeout = setTimeout(() => {
    const { scrollLeft, maxScrollLeft, frameWidth, maxFrameCount } = trackStore
    if (newPosition < 0) {
      const left = newPosition + scrollLeft
      trackStore.setScrollLeft(left > 0 ? left : 0)
      const currentFrame = Math.ceil(trackStore.scrollLeftTrackWidth / frameWidth)
      playerStore.setCurrentFrame(currentFrame)
    } else if (newPosition > maxPosition) {
      const left = newPosition - maxPosition + scrollLeft
      trackStore.setScrollLeft(left > maxScrollLeft ? maxScrollLeft : left)
      const currentFrame = Math.floor(
        (trackStore.scrollLeftTrackWidth + trackStore.scrollbarContainerWidth) / frameWidth,
      )
      playerStore.setCurrentFrame(left > maxScrollLeft ? maxFrameCount : currentFrame)
    }
    autoScroll()
  }, AUTO_SCROLL_SPEED)
}

function stopAutoScroll() {
  window.clearTimeout(scrollTimeout)
}

function setCurrentFrame(newPosition: number) {
  // autoScroll 中处理
  if (newPosition < 0 || newPosition > maxPosition) return

  const currentFrame = Math.round(
    (newPosition + trackStore.scrollLeftTrackWidth) / trackStore.frameWidth,
  )
  playerStore.setCurrentFrame(currentFrame)
}

function onDragEnd() {
  stopAutoScroll()
  /*
   * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
   * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同j一个 DOM 上
   */
  setTimeout(() => {
    dragging = false
    if (!isClick) {
      setCurrentFrame(newPosition)
    }
  }, 0)
  window.removeEventListener('mousemove', onDragging)
  window.removeEventListener('touchmove', onDragging)
  window.removeEventListener('mouseup', onDragEnd)
  window.removeEventListener('touchend', onDragEnd)
  window.removeEventListener('contextmenu', onDragEnd)
}

function onCursorDown(event: MouseEvent | TouchEvent) {
  event.preventDefault()
  onDragStart(event)
  window.addEventListener('mousemove', onDragging)
  window.addEventListener('touchmove', onDragging)
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('touchend', onDragEnd)
  window.addEventListener('contextmenu', onDragEnd)
}
</script>

<template>
  <div
    class="timeline-cursor"
    :style="cursorStyle"
    ref="seekLineRef"
    @mousedown="onCursorDown"
    @touchstart="onCursorDown"
  >
    <div class="top"></div>
    <div class="line"></div>
  </div>
</template>

<style lang="scss" scoped>
.timeline-cursor {
  position: absolute;
  top: 0;
  right: 0;
  left: -5.5px;
  width: 11px;
  height: 100%;
  pointer-events: none;
  transform: translate(-50%);
  z-index: 1;

  .top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    pointer-events: auto;
    cursor: ew-resize;
    background-color: var(--app-color-white);

    &::before {
      position: absolute;
      top: 10px;
      left: 0;
      display: block;
      width: 0;
      height: 0;
      content: '';
      border-top: 6px solid var(--app-color-white);
      border-left: 6px solid transparent;
    }

    &::after {
      position: absolute;
      top: 10px;
      right: 0;
      display: block;
      width: 0;
      height: 0;
      content: '';
      border-top: 6px solid var(--app-color-white);
      border-right: 6px solid transparent;
    }
  }

  .line {
    position: absolute;
    top: 0;
    left: 5px;
    width: 0;
    height: 100%;
    border-left: 1px solid var(--app-color-white);
  }
}
</style>
