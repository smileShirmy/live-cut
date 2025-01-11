<script setup lang="ts">
import { ref } from 'vue'
import VideoItem from '../components/VideoItem.vue'
import { ResourceType, type VideoResource } from '@/types/resource'

const list = ref<VideoResource[]>([
  {
    type: ResourceType.VIDEO,
    name: 'video name',
    duration: 2000,
  },
])
</script>

<template>
  <ul class="s-resource-list">
    <li class="s-resource-item" v-for="(item, i) in list" :key="i">
      <VideoItem :item="item" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '../assets/scss/shared.scss';
</style>
