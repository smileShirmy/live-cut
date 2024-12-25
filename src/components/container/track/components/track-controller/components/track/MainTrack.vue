<script setup lang="ts">
import { TrackPosition, type MainTrack } from '@/types'

defineProps<{
  track: MainTrack
}>()

defineExpose<{
  position: TrackPosition.Main
}>({
  position: TrackPosition.Main,
})
</script>

<template>
  <div class="main-track">
    <div class="track-options"></div>
    <div class="track-wrapper">
      <div class="track"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-track {
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
