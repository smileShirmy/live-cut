<script setup lang="ts">
import { useTrackStore } from '@/stores/track'
import { useResizeObserver, useThrottleFn } from '@vueuse/core'
import { computed, ref, type ComputedRef, type CSSProperties } from 'vue'

const scrollbarContainerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<HTMLDivElement>()

const trackStore = useTrackStore()

const scrollbarContainerStyle: ComputedRef<CSSProperties> = computed(() => {
  return {
    visibility: trackStore.scaleLevel > 0 ? 'unset' : 'hidden',
  }
})
const scrollbarStyle: ComputedRef<CSSProperties> = computed(() => {
  return {
    width: trackStore.scrollbarPercentage > 0 ? `${trackStore.scrollbarPercentage * 100}%` : 'auto',
    left: `${trackStore.scrollLeft}px`,
  }
})

const onScrollbarContainerResize = useThrottleFn<
  (entries: ReadonlyArray<ResizeObserverEntry>, observer: ResizeObserver) => void
>(
  ([{ contentRect }]) => {
    const { width } = contentRect
    trackStore.setScrollbarContainerWidth(width)
  },
  50,
  true,
)

useResizeObserver(scrollbarContainerRef, onScrollbarContainerResize)

let dragging = false
let startX = 0
let currentX = 0
let startPosition = 0
let newPosition = 0
let maxPosition = 0

function getClientX(event: MouseEvent | TouchEvent) {
  if (event instanceof TouchEvent) {
    return event.touches[0].clientX
  }
  return event.clientX
}

function onDragStart(event: MouseEvent | TouchEvent) {
  dragging = true
  startX = getClientX(event)
  startPosition = trackStore.scrollLeft
  newPosition = startPosition
  maxPosition = trackStore.maxScrollLeft
}

function onDragging(event: MouseEvent | TouchEvent) {
  if (dragging) {
    currentX = getClientX(event)
    const diff = currentX - startX
    newPosition = startPosition + diff
    if (newPosition < 0) {
      trackStore.setScrollLeft(0)
    } else if (newPosition > maxPosition) {
      trackStore.setScrollLeft(maxPosition)
    } else {
      trackStore.setScrollLeft(newPosition)
    }
  }
}

function onDragEnd() {
  window.removeEventListener('mousemove', onDragging)
  window.removeEventListener('touchmove', onDragging)
  window.removeEventListener('mouseup', onDragEnd)
  window.removeEventListener('touchend', onDragEnd)
  window.removeEventListener('contextmenu', onDragEnd)
}

function onButtonDown(event: MouseEvent | TouchEvent) {
  event.preventDefault()
  onDragStart(event)
  window.addEventListener('mousemove', onDragging)
  window.addEventListener('touchmove', onDragging)
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('touchend', onDragEnd)
  window.addEventListener('contextmenu', onDragEnd)
}

function onClickContainer({ clientX }: MouseEvent) {
  if (!scrollbarContainerRef.value) return
  const { left: offsetLeft } = scrollbarContainerRef.value.getBoundingClientRect()
  const left = clientX - offsetLeft
  const { scrollLeft, scrollbarWidth, maxScrollLeft } = trackStore
  if (left > scrollLeft + scrollbarWidth) {
    const newLeft = scrollLeft + scrollbarWidth
    trackStore.setScrollLeft(newLeft > maxScrollLeft ? maxScrollLeft : newLeft)
  } else if (left < scrollLeft) {
    const newLeft = scrollLeft - scrollbarWidth
    trackStore.setScrollLeft(newLeft < 0 ? 0 : newLeft)
  }
}
</script>

<template>
  <div
    ref="scrollbarContainerRef"
    class="scrollbar-container"
    :style="scrollbarContainerStyle"
    @click="onClickContainer"
  >
    <div
      ref="scrollbarRef"
      class="scrollbar"
      :style="scrollbarStyle"
      @mousedown="onButtonDown"
      @touchstart="onButtonDown"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.scrollbar-container {
  position: absolute;
  bottom: 0;
  height: 6px;
  width: calc(100% - 80px);
  margin-left: 80px;

  .scrollbar {
    position: absolute;
    height: 6px;
    border-radius: 3px;
    background: var(--app-bg-color-lighter);
  }
}
</style>
