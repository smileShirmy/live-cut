<script setup lang="ts">
import { isBoolean } from '@/services/helpers/general'
import {
  Left as IconLeft,
  Up as IconUp,
  Right as IconRight,
  Down as IconDown,
} from '@icon-park/vue-next'
import { computed, ref, watch } from 'vue'

const TRANSITION_DURATION = 300

defineOptions({
  name: 'AppPaneDivider',
})

const props = withDefaults(
  defineProps<{
    placement?: 'up' | 'right' | 'down' | 'left'
    collapseSize?: string
    modelValue?: boolean
  }>(),
  {
    modelValue: true,
  },
)

const emit = defineEmits({
  ['update:modelValue']: (val) => isBoolean(val),
  change: (val: boolean, oldVal: boolean) => isBoolean(val) && isBoolean(oldVal) && val !== oldVal,
})

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

const isExpand = computed(() => props.modelValue)

watch(isExpand, toggle)

function toggle(isExpand: boolean) {
  if (!appPaneDividerRef.value) {
    return
  }

  const pane = appPaneDividerRef.value.previousElementSibling
  if (!(pane instanceof HTMLElement)) {
    return
  }

  pane.style.transitionProperty = 'all'
  pane.style.transitionDuration = '0.3s'
  pane.style.transitionTimingFunction = 'ease-in-out'

  const isVertical = ['left', 'right'].some((v) => v === props.placement)

  if (isVertical) {
    if (isExpand) {
      pane.style.width = pane.dataset.width ?? 'auto'
      setTimeout(() => {
        pane.style.minWidth = pane.dataset.beforeMinWidth ?? 'auto'
      }, TRANSITION_DURATION)
    } else {
      // 合起来之前记录一下 minWidth 和 width
      pane.dataset.beforeMinWidth = pane.style.minWidth
      pane.dataset.width = pane.style.width

      // TODO: 处理 right-arrow 和 bottom-arrow
      pane.style.width = props.collapseSize ?? '0'
      pane.style.minWidth = 'auto'
    }
  } else {
    if (isExpand) {
      pane.style.height = pane.dataset.height ?? 'auto'
      setTimeout(() => {
        pane.style.minHeight = pane.dataset.beforeMinHeight ?? 'auto'
      }, TRANSITION_DURATION)
    } else {
      // 合起来之前记录一下 minWidth 和 width
      pane.dataset.beforeMinHeight = pane.style.minHeight
      pane.dataset.height = pane.style.height

      pane.style.minHeight = 'auto'
      pane.style.height = props.collapseSize ?? '0'
    }
  }

  // TODO: cancel transition
}

function fold() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div v-show="props.modelValue" class="app-pane-divider" ref="appPaneDividerRef">
    <div
      v-if="placement && props.modelValue"
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
