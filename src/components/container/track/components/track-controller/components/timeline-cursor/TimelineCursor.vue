<script setup lang="ts">
import { computed, type ComputedRef, type CSSProperties } from 'vue'
import { useTrackStore } from '@/store/track'
import { usePlayerStore } from '@/store/player'

const trackStore = useTrackStore()
const playerStore = usePlayerStore()

const OFFSET_LEFT = 80

const cursorStyle: ComputedRef<CSSProperties> = computed(() => {
  const left = trackStore.frameWidth * playerStore.currentFrame - trackStore.scrollLeftTrackWidth
  return {
    display: left < 0 ? 'none' : 'block',
    left: `${left + OFFSET_LEFT}px`,
  }
})

function onCursorDown() {
  //
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
