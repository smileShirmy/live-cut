<script setup lang="ts">
import { ref } from 'vue'
import VideoItem from '../components/VideoItem.vue'

const list = ref([{}])
</script>

<template>
  <ul class="s-resource-list">
    <li class="s-resource-item" v-for="(item, i) in list" :key="i">
      <VideoItem />
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '../assets/scss/shared.scss';
</style>
