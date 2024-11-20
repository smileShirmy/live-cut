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
  event.preventDefault()

  const { target } = event
  if (!(target instanceof HTMLElement || target instanceof SVGSVGElement)) {
    return
  }

  const isFoldBtn = target.closest('.app-pane-divider-fold')
  if (isFoldBtn) {
    return
  }

  const divider = target.closest('.app-pane-divider')
  if (!divider) {
    return
  }

  const prePane = divider.previousElementSibling
  const nextPane = divider.nextElementSibling
  if (!(prePane instanceof HTMLElement && nextPane instanceof HTMLElement)) {
    return
  }

  const { pageX: initialPageX, pageY: initialPageY } = getPageXY(event)

  const { offsetWidth: preWidth, offsetHeight: preHeight } = prePane
  const { offsetWidth: nextWidth, offsetHeight: nextHeight } = nextPane
  const preUsePercentage = prePane.style.width.match('%')
  const nextUsePercentage = nextPane.style.width.match('%')
  isResizing.value = true

  const resize = (
    preSize: number | null = null,
    nextSize: number | null = null,
    offset: number = 0,
  ) => {
    if (
      !(prePane instanceof HTMLElement) ||
      preSize === null ||
      nextSize === null ||
      !containerRef.value
    ) {
      return
    }

    if (props.layout === 'vertical') {
      const containerWidth = containerRef.value.clientWidth
      const newPreWidth = preSize + offset
      const preWidth = preUsePercentage
        ? `${(newPreWidth / containerWidth) * 100}%`
        : `${newPreWidth}px`

      const newNextWidth = nextSize - offset
      const nextWidth = nextUsePercentage
        ? `${(newNextWidth / containerWidth) * 100}%`
        : `${newNextWidth}px`

      prePane.dataset.width = prePane.style.width = preWidth
      nextPane.dataset.width = nextPane.style.width = nextWidth
    }

    if (props.layout === 'horizontal') {
      const containerHeight = containerRef.value.clientHeight
      const newPreHeight = preSize + offset
      const preHeight = preUsePercentage
        ? `${(newPreHeight / containerHeight) * 100}%`
        : `${newPreHeight}px`

      const newNextHeight = nextSize - offset
      const nextHeight = nextUsePercentage
        ? `${(newNextHeight / containerHeight) * 100}%`
        : `${newNextHeight}px`

      prePane.dataset.height = prePane.style.height = preHeight
      nextPane.dataset.height = nextPane.style.height = nextHeight
    }
  }

  const onMouseMove = (event: MouseEvent | TouchEvent) => {
    const { pageX, pageY } = getPageXY(event)

    if (props.layout === 'vertical') {
      resize(preWidth, nextWidth, pageX - initialPageX)
    } else {
      resize(preHeight, nextHeight, pageY - initialPageY)
    }
  }

  const onMouseUp = function () {
    if (!(prePane instanceof HTMLElement)) {
      return
    }

    isResizing.value = false

    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('touchmove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('touchend', onMouseUp)
    window.removeEventListener('contextmenu', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('touchmove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('touchend', onMouseUp)
  window.addEventListener('contextmenu', onMouseUp)
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

  &.layout-h {
    flex-direction: column;
  }

  &.layout-v {
    flex-direction: row;
  }
}

.app-pane-divider {
  display: block;
  position: relative;
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
