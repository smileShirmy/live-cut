<script setup lang="ts">
import type { AudioTrack } from '@/services/track/audio-track'
import { useTrackStore } from '@/stores/track'
import { TrackPosition } from '@/types/drag'
import { computed, type ComputedRef, type CSSProperties } from 'vue'

const props = defineProps<{
  track: AudioTrack
}>()

defineExpose<{
  position: TrackPosition.Audio
}>({
  position: TrackPosition.Audio,
})

const trackStore = useTrackStore()

const trackStyle: ComputedRef<CSSProperties> = computed(() => {
  return {
    left: `-${trackStore.scrollLeftTrackWidth}px`,
  }
})
</script>

<template>
  <div class="audio-track">
    <div class="track-options"></div>
    <div class="track-wrapper">
      <div class="track" :trackStyle="trackStyle">
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
.audio-track {
  display: flex;
  width: 100%;
  height: 24px;

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
