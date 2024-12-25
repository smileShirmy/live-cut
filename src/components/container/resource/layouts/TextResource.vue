<script setup lang="ts">
import { DEFAULT_TEXT, DEFAULT_TEXT_DURATION } from '@/config'
import TextItem from '../components/TextItem.vue'
import { ref } from 'vue'
import { ResourceType, type TextResource } from '@/types/resource'

const defaultTextResource: TextResource = {
  type: ResourceType.TEXT,
  name: DEFAULT_TEXT,
  duration: DEFAULT_TEXT_DURATION,
}

const list = ref<TextResource[]>([defaultTextResource])
</script>

<template>
  <ul class="s-resource-list">
    <li class="s-resource-item" v-for="(item, i) in list" :key="i">
      <TextItem :item="item" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '../assets/scss/shared.scss';
</style>
