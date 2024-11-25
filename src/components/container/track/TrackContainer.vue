<script setup lang="ts">
import ControlBar from './components/control-bar/ControlBar.vue'
import TrackController from './components/track-controller/TrackController.vue'
</script>

<template>
  <div class="track-container" :style="{ minHeight: '210px' }">
    <ControlBar />
    <TrackController />
  </div>
</template>

<style lang="scss" scoped>
.track-container {
  background-color: var(--app-bg-color);
}
</style>
