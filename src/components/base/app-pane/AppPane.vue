<script setup lang="ts">
import { computed, ref, type ComputedRef, type CSSProperties } from 'vue'

defineOptions({
  name: 'AppPane',
})

const props = withDefaults(
  defineProps<{
    layout?: 'horizontal' | 'vertical'
  }>(),
  {
    layout: 'horizontal',
  },
)

const isResizing = ref(false)

const classList = computed(() => ['app-pane', `layout-${props.layout.slice(0, 1)}`])

const containerStyle: ComputedRef<CSSProperties> = computed(() => ({
  cursor: isResizing.value ? (props.layout === 'vertical' ? 'col-resize' : 'row-resize') : '',
  userSelect: isResizing.value ? 'none' : undefined,
}))

const containerRef = ref<HTMLDivElement>()

function getPageXY(event: MouseEvent | TouchEvent) {
  if (event instanceof TouchEvent) {
    return {
      pageX: event.touches[0].pageX,
      pageY: event.touches[1].pageY,
    }
  }
  return {
    pageX: event.pageX,
    pageY: event.pageY,
  }
}

function onMousedown(event: MouseEvent | TouchEvent) {
  const { target } = event
  if (!(target instanceof HTMLElement)) {
    return
  }

  const divider = target.closest('.app-pane-divider')
  if (!divider) {
    return
  }

  const pane = target.previousElementSibling
  if (!(pane instanceof HTMLElement)) {
    return
  }

  const { pageX: initialPageX, pageY: initialPageY } = getPageXY(event)

  const { offsetWidth, offsetHeight } = pane
  const usePercentage = pane.style.width.match('%')
  isResizing.value = true

  const resize = (initialSize: number | null = null, offset: number = 0) => {
    if (!(pane instanceof HTMLElement) || initialSize === null || !containerRef.value) {
      return 'auto'
    }

    if (props.layout === 'vertical') {
      const containerWidth = containerRef.value.clientWidth
      const paneWidth = initialSize + offset

      return (pane.style.width = usePercentage
        ? (paneWidth / containerWidth) * 100 + '%'
        : paneWidth + 'px')
    }

    if (props.layout === 'horizontal') {
      const containerHeight = target.clientHeight
      const paneHeight = initialSize + offset

      return (pane.style.height = usePercentage
        ? (paneHeight / containerHeight) * 100 + '%'
        : paneHeight + 'px')
    }
  }

  const onMouseMove = (event: MouseEvent | TouchEvent) => {
    const { pageX, pageY } = getPageXY(event)

    if (props.layout === 'vertical') {
      resize(offsetWidth, pageX - initialPageX)
    } else {
      resize(offsetHeight, pageY - initialPageY)
    }
  }

  const onMouseUp = function () {
    if (!(pane instanceof HTMLElement)) {
      return
    }

    isResizing.value = false

    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}
</script>

<template>
  <section
    :class="classList"
    :style="containerStyle"
    ref="containerRef"
    @mousedown.stop="onMousedown"
    @touchstart.stop="onMousedown"
  >
    <slot></slot>
  </section>
</template>

<style lang="scss">
.app-pane {
  display: flex;
  position: relative;

  &.layout-h {
    flex-direction: column;
  }

  &.layout-v {
    flex-direction: row;
  }
}

.app-pane > div {
  position: relative;
  z-index: 1;
}

.app-pane-divider {
  display: block;
  position: relative;
  z-index: 2;
}

.layout-h > .app-pane-divider {
  width: 100%;
  height: 10px;
  margin-top: -10px;
  top: 5px;
  cursor: row-resize;
}

.layout-v > .app-pane-divider {
  width: 10px;
  height: 100%;
  margin-left: -10px;
  left: 5px;
  cursor: col-resize;
}
</style>
