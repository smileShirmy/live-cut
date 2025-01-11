<script setup lang="ts">
import type { CommonTrack } from '@/services/track/common-track'
import { useTrackStore } from '@/stores/track'
import { TrackPosition } from '@/types/drag'
import { computed, type ComputedRef, type CSSProperties } from 'vue'

const props = defineProps<{
  track: CommonTrack
}>()

defineExpose<{
  position: TrackPosition.Common
}>({
  position: TrackPosition.Common,
})

const trackStore = useTrackStore()

const trackStyle: ComputedRef<CSSProperties> = computed(() => {
  return {
    left: `-${trackStore.scrollLeftTrackWidth}px`,
  }
})
</script>

<template>
  <div class="common-track">
    <div class="track-options"></div>
    <div class="track-wrapper">
      <div class="track" :style="trackStyle">
        <component
          v-for="(item, i) in props.track.items"
          :key="i"
          :is="item"
          :trackItem="item"
        ></component>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.common-track {
  display: flex;
  width: 100%;
  height: 60px;

  .track-options {
    flex-shrink: 0;
    width: 80px;
    height: 100%;
  }

  .track-wrapper {
    flex: 1;
    position: relative;
    overflow: hidden;

    .track {
      position: absolute;
      top: 0;
      left: 0;
      width: 2000px;
      height: 100%;
      background-color: #000;
    }
  }
}
</style>
