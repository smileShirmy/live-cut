<script setup lang="ts">
import { TrackPosition } from '@/types/drag'
import { type CommonTrack } from '@/types/track'

defineProps<{
  track: CommonTrack
}>()

defineExpose<{
  position: TrackPosition.Common
}>({
  position: TrackPosition.Common,
})
</script>

<template>
  <div class="common-track">
    <div class="track-options"></div>
    <div class="track-wrapper">
      <div class="track"></div>
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
