<script setup lang="ts">
import { emitter, Events } from '@/services/mitt/emitter'
import ControlBar from './components/control-bar/ControlBar.vue'
import TrackController from './components/track-controller/TrackController.vue'
import { useTemplateRef } from 'vue'
import { TRACK_RESOURCE_OFFSET_LEFT } from '@/config'

const trackContainerRef = useTemplateRef<HTMLDivElement>('trackContainerRef')

emitter.on(Events.INIT_DROP_AREA, (set) => {
  if (!trackContainerRef.value) return

  const { top, left } = trackContainerRef.value.getBoundingClientRect()

  set({
    top,
    left: left + TRACK_RESOURCE_OFFSET_LEFT,
  })
})
</script>

<template>
  <div class="track-container" ref="trackContainerRef" :style="{ minHeight: '210px' }">
    <ControlBar />
    <TrackController />
  </div>
</template>

<style lang="scss" scoped>
.track-container {
  background-color: var(--app-bg-color);
}
</style>
