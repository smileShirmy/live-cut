<script setup lang="ts">
import { TrackPosition, type AudioTrack } from '@/types'

defineProps<{
  track: AudioTrack
}>()

defineExpose<{
  position: TrackPosition.Audio
}>({
  position: TrackPosition.Audio,
})
</script>

<template>
  <div class="audio-track">
    <div class="track-options"></div>
    <div class="track-wrapper">
      <div class="track"></div>
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
