<script setup lang="ts">
import type { AudioTrackItem } from '@/services/track-item/audio-track-item'
import TrackItemHandler from './TrackItemHandler.vue'

const props = defineProps<{
  trackItem: AudioTrackItem
}>()
</script>

<template>
  <TrackItemHandler :trackItem="props.trackItem">
    <!--  -->
  </TrackItemHandler>
</template>
