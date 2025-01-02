<script setup lang="ts">
import type { MainTrack } from '@/services/track/main-track'
import { TrackPosition } from '@/types/drag'

const props = defineProps<{
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
      <div class="track">
        <component
          v-for="(item, i) in props.track.items"
          :key="i"
          :is="item.componentName"
        ></component>
      </div>
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
      width: 100%;
      height: 100%;
      background-color: #000;
    }
  }
}
</style>
