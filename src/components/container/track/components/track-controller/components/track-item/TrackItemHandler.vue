<script lang="ts" setup>
import { useTrackStore } from '@/stores/track'
import type { TrackItem } from '@/types/track-item'
import { computed, type ComputedRef, type CSSProperties } from 'vue'

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

const trackItemHandlerStyle: ComputedRef<CSSProperties> = computed(() => {
  return {
    left: `${trackStore.frameToWidth(props.trackItem.startFrame)}px`,
    width: `${trackStore.durationToWidth(props.trackItem.duration)}px`,
  }
})
</script>

<template>
  <div class="track-item-handler" :style="trackItemHandlerStyle">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.track-item-handler {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: var(--app-bg-color-lighter);
}
</style>
