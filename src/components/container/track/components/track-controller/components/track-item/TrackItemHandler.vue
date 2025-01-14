<script lang="ts" setup>
import { useTrackStore } from '@/stores/track'
import type { TrackItem } from '@/types/track-item'
import { computed, ref, type ComputedRef, type CSSProperties } from 'vue'
import { useHover } from './use-hover'
import { useDragHandler } from './use-drag-handler'
import { TRACK_ITEM_HANDLER_WIDTH } from '@/config'

const props = withDefaults(
  defineProps<{
    trackItem: TrackItem
    loading?: boolean
  }>(),
  {
    loading: false,
  },
)

const trackStore = useTrackStore()

const leftDragging = ref(false)
const rightDragging = ref(false)

const { isHover, onmouseenter, onmouseleave } = useHover()

const trackItemHandlerStyle: ComputedRef<CSSProperties> = computed(() => {
  return {
    left: `${trackStore.frameToPixel(props.trackItem.currentStartFrame.value)}px`,
    width: `${trackStore.frameToPixel(props.trackItem.currentFrameCount.value)}px`,
  }
})

const isSelected = computed(
  () =>
    props.trackItem.id === trackStore.selectedId && !(leftDragging.value || rightDragging.value),
)

const showHandler = computed(() => isHover.value || isSelected.value)

const minWidthFrame = computed<number>(() => {
  const minFrameCount = trackStore.pixelToFrame(TRACK_ITEM_HANDLER_WIDTH)
  const frameCount = props.trackItem.currentEndFrame.value - props.trackItem.currentStartFrame.value
  return frameCount < minFrameCount ? frameCount : minFrameCount
})

const prevItemCurrentEndFrame = computed<number>(() => {
  const parentTrack = props.trackItem.parentTrack
  if (parentTrack) {
    const frames = parentTrack.items.reduce((pre: number[], cur) => {
      if (cur.currentEndFrame.value < props.trackItem.currentStartFrame.value) {
        return pre.concat(cur.currentEndFrame.value)
      }
      return pre
    }, [])
    return Math.max(...frames)
  }
  return -Infinity
})

const nextItemCurrentStartFrame = computed<number>(() => {
  const parentTrack = props.trackItem.parentTrack
  if (parentTrack) {
    const frames = parentTrack.items.reduce((pre: number[], cur) => {
      if (props.trackItem.currentEndFrame.value < cur.currentStartFrame.value) {
        return pre.concat(cur.currentStartFrame.value)
      }
      return pre
    }, [])
    return Math.min(...frames)
  }
  return Infinity
})

function onLeftHandlerDown(event: MouseEvent | TouchEvent) {
  trackStore.setSelectedId(props.trackItem.id)
  leftDragging.value = true
  const prevEndFrame = prevItemCurrentEndFrame.value

  const { onHandlerDown } = useDragHandler(
    props.trackItem.currentStartFrame.value,
    (newFrame: number) => {
      const startFrame = props.trackItem.startFrame
      const max = props.trackItem.currentEndFrame.value
      let offset = newFrame - startFrame

      if (newFrame <= prevEndFrame) {
        offset = prevEndFrame - startFrame
      } else if (newFrame < startFrame) {
        offset = 0
      } else if (newFrame >= max - minWidthFrame.value) {
        offset = max - startFrame - minWidthFrame.value
      }

      props.trackItem.setStartFrameOffset(offset)
    },
    () => {
      leftDragging.value = false
    },
  )
  onHandlerDown(event)
}

function onRightHandlerDown(event: MouseEvent | TouchEvent) {
  trackStore.setSelectedId(props.trackItem.id)
  rightDragging.value = true
  const nextStartFrame = nextItemCurrentStartFrame.value

  const { onHandlerDown } = useDragHandler(
    props.trackItem.currentEndFrame.value,
    (newFrame: number) => {
      const endFrame = props.trackItem.endFrame
      const min = props.trackItem.currentStartFrame.value
      let offset = newFrame - endFrame

      if (newFrame >= nextStartFrame) {
        offset = nextStartFrame - endFrame
      } else if (newFrame > endFrame) {
        offset = 0
      } else if (newFrame <= min + minWidthFrame.value) {
        offset = min - endFrame + minWidthFrame.value
      }

      props.trackItem.setEndFrameOffset(offset)
    },
    () => {
      rightDragging.value = false
    },
  )
  onHandlerDown(event)
}
</script>

<template>
  <div
    class="track-item-handler"
    :class="{ 'is-selected': isSelected }"
    :style="trackItemHandlerStyle"
    @mouseenter="onmouseenter"
    @mouseleave="onmouseleave"
    @click.stop
  >
    <slot></slot>

    <div
      v-show="showHandler"
      class="track-handler left-handler"
      :class="{ 'is-dragging': leftDragging }"
      @mousedown="onLeftHandlerDown"
      @touchstart="onLeftHandlerDown"
    ></div>
    <div
      v-show="showHandler"
      class="track-handler right-handler"
      :class="{ 'is-dragging': rightDragging }"
      @mousedown="onRightHandlerDown"
      @touchstart="onRightHandlerDown"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.track-item-handler {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: 4px;
  background-color: var(--app-bg-color-lighter);

  &.is-selected::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid var(--app-color-white);
  }
}

.track-handler {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  border-color: transparent;
  cursor: col-resize;

  &::before {
    display: block;
    content: '';
    width: 1px;
    height: 8px;
    background-color: var(--app-color-white);
    margin-right: 2px;
  }

  &::after {
    display: block;
    content: '';
    width: 1px;
    height: 8px;
    background-color: var(--app-color-white);
  }

  &.handler-selected {
    border-color: var(--app-color-white);
  }

  &.left-handler {
    left: 0;
    border-radius: 4px 0 0 4px;
    border-width: 1px 0 1px 1px;
    border-style: solid;
  }

  &.right-handler {
    right: 0;
    border-radius: 0 4px 4px 0;
    border-width: 1px 1px 1px 0;
    border-style: solid;
  }

  &.is-dragging {
    border-color: var(--app-color-white);
  }
}
</style>
