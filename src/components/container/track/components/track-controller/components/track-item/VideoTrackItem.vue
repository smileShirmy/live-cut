<script setup lang="ts">
import type { VideoTrackItem } from '@/services/track-item/video-track-item'
import TrackItemHandler from './TrackItemHandler.vue'

const props = defineProps<{
  trackItem: VideoTrackItem
}>()
</script>

<template>
  <TrackItemHandler :trackItem="props.trackItem">
    <!--  -->
  </TrackItemHandler>
</template>
