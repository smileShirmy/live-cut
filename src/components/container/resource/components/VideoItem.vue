<script lang="ts" setup>
import { DragCommon } from '@/services/drag-drop/drag-common'
import { VideoTrackItem } from '@/services/track-item/video-track-item'
import type { VideoResource } from '@/types/resource'
import { ref } from 'vue'

const props = defineProps<{
  item: VideoResource
}>()

const videoItemRef = ref<HTMLElement>()

function onDragStart(e: PointerEvent) {
  e.preventDefault()
  if (!videoItemRef.value) return

  DragCommon.dragStart({
    startPointerEvent: e,
    dragTarget: videoItemRef.value,
    trackItem: VideoTrackItem.create(props.item),
  })
}
</script>

<template>
  <div ref="videoItemRef" class="video-item-container" @pointerdown="onDragStart">
    <div class="video-cover-wrapper">
      <img class="video-cover" src="" />
    </div>
    <h5 class="video-name">{{ props.item.name }}</h5>
  </div>
</template>

<style scoped lang="scss">
.video-item-container {
  position: relative;
  z-index: 1;

  .video-cover-wrapper {
    width: 116px;
    height: 78px;
    background-color: var(--app-color-black);
    border-radius: 4px;
    overflow: hidden;

    .video-cover {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .video-name {
    margin-top: 8px;
    color: var(--app-text-color-regular);
    font-size: var(--app-font-size-extra-small);
  }
}
</style>
