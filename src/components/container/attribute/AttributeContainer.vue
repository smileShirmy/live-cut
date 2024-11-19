<script setup lang="ts">
import { useAppStore } from '@/store/app'

const appStore = useAppStore()

function clickContainer() {
  if (!appStore.attributeVisible) {
    appStore.toggleAttributeVisible(true)
  }
}
</script>

<template>
  <div class="attribute-container" :style="{ minWidth: '360px' }" @click="clickContainer">
    AttributeContainer
  </div>
</template>

<style lang="scss" scoped>
.attribute-container {
  flex: 1;
  background-color: var(--app-bg-color);
}
</style>
