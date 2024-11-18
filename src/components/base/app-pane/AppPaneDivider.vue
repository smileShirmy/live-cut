<script setup lang="ts">
import {
  Left as IconLeft,
  Up as IconUp,
  Right as IconRight,
  Down as IconDown,
} from '@icon-park/vue-next'
import { computed, ref } from 'vue'

defineOptions({
  name: 'AppPaneDivider',
})

// v-model 传 is-collapse 并且放在 store 中

const props = defineProps<{
  placement?: 'up' | 'right' | 'down' | 'left'
  collapseSize?: string
}>()

const appPaneDividerRef = ref<HTMLDivElement>()

const iconComponent = computed(() => {
  return props.placement
    ? {
        up: IconUp,
        right: IconRight,
        down: IconDown,
        left: IconLeft,
      }[props.placement]
    : null
})

function fold() {
  if (!appPaneDividerRef.value) {
    return
  }

  const pane = appPaneDividerRef.value.previousElementSibling
  if (!(pane instanceof HTMLElement)) {
    return
  }

  if (['left', 'right'].some((v) => v === props.placement)) {
    pane.style.minWidth = 'auto'
    pane.style.width = props.collapseSize ?? '0'
  } else {
    pane.style.minHeight = 'auto'
    pane.style.height = props.collapseSize ?? '0'
  }
}
</script>

<template>
  <div class="app-pane-divider" ref="appPaneDividerRef">
    <div
      v-if="placement"
      class="app-pane-divider-fold"
      :data-collapse-size="collapseSize"
      :class="`is-${placement}`"
      @pointerdown="fold"
    >
      <component :is="iconComponent" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-pane-divider {
  position: relative;
  flex-shrink: 0;
  user-select: none;

  .app-pane-divider-fold {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: var(--app-bg-color-lighter);
    color: var(--app-text-color-primary);
    cursor: pointer;
    z-index: 1;

    &.is-left {
      top: 50%;
      left: -5px;
      width: 10px;
      height: 34px;
      border-radius: 4px 0 0 4px;
      transform: translateY(-50%);
    }

    &.is-right {
      top: 50%;
      right: -5px;
      width: 10px;
      height: 34px;
      border-radius: 0 4px 4px 0;
      transform: translateY(-50%);
    }

    &.is-up {
      left: 50%;
      top: -5px;
      width: 34px;
      height: 10px;
      border-radius: 4px 4px 0 0;
      transform: translateX(-50%);
    }

    &.is-down {
      left: 50%;
      bottom: -5px;
      width: 34px;
      height: 10px;
      border-radius: 0 0 4px 4px;
      transform: translateX(-50%);
    }

    &:hover {
      background-color: var(--app-bg-color-extra-lighter);
    }
  }
}
</style>
