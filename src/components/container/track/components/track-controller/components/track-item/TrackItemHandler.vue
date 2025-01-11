<script lang="ts" setup>
import { useTrackStore } from '@/stores/track'
import type { TrackItem } from '@/types/track-item'
import { computed, type ComputedRef, type CSSProperties } from 'vue'
import { useHover } from './use-hover'
import { useDragHandler } from './use-drag-handler'

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

const { isHover, onmouseenter, onmouseleave } = useHover()

const trackItemHandlerStyle: ComputedRef<CSSProperties> = computed(() => {
  return {
    left: `${trackStore.frameToPixel(props.trackItem.startFrame)}px`,
    width: `${trackStore.durationToWidth(props.trackItem.duration)}px`,
  }
})

const showHandler = computed(() => isHover.value)

function onLeftHandlerDown(event: MouseEvent | TouchEvent) {
  const { onHandlerDown } = useDragHandler(props.trackItem, (frame: number) => {
    props.trackItem.setStartFrame(frame)
  })
  onHandlerDown(event)
}

function onRightHandlerDown(event: MouseEvent | TouchEvent) {
  const { onHandlerDown } = useDragHandler(props.trackItem, (frame: number) => {
    props.trackItem.setStartFrame(frame)
  })
  onHandlerDown(event)
}
</script>

<template>
  <div
    class="track-item-handler"
    :style="trackItemHandlerStyle"
    @mouseenter="onmouseenter"
    @mouseleave="onmouseleave"
    @click.stop
  >
    <slot></slot>

    <div
      v-show="showHandler"
      class="track-handler left-handler"
      @mousedown="onLeftHandlerDown"
      @touchstart="onLeftHandlerDown"
    ></div>
    <div
      v-show="showHandler"
      class="track-handler right-handler"
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
}
</style>
