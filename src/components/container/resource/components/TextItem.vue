<script lang="ts" setup>
import { useDragStore } from '@/stores/drag'
import type { TextResource } from '@/types/resource'
import { ref } from 'vue'

const props = defineProps<{
  item: TextResource
}>()

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
    {{ props.item.name }}
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
