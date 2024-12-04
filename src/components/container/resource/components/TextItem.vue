<script lang="ts" setup>
import { useDragStore } from '@/stores/drag'
import { ref } from 'vue'

const dragStore = useDragStore()
const textItemRef = ref<HTMLElement>()

function onDragStart(e: MouseEvent | TouchEvent) {
  if (textItemRef.value) {
    dragStore.onDragStart(e, textItemRef.value)
  }
}
</script>

<template>
  <div
    ref="textItemRef"
    class="text-item-container"
    @mousedown="onDragStart"
    @touchstart="onDragStart"
  >
    text
  </div>
</template>

<style scoped lang="scss">
.text-item-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: var(--app-color-black);
  border-radius: 4px;
  font-size: var(--app-font-size-extra-small);
}
</style>
