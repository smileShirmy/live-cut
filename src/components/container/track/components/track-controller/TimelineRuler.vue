<script setup lang="ts">
import { useTrackStore } from '@/store/track'
import { watchThrottled } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const timelineRulerRef = ref<HTMLCanvasElement>()
const trackStore = storeToRefs(useTrackStore())

watchThrottled(
  [trackStore.scaleLevel],
  () => {
    // TODO:
  },
  { throttle: 100, trailing: true },
)
</script>

<template>
  <div class="timeline-ruler-container">
    <canvas ref="timelineRulerRef" class="timeline-ruler"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.timeline-ruler-container {
  display: flex;
  height: 30px;

  .timeline-ruler {
    flex: 1;
    margin-left: 80px;
  }
}
</style>
