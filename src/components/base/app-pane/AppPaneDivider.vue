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
    collapseSize?: number
    modelValue?: boolean
  }>(),
  {
    collapseSize: 0,
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

  const prevPane = appPaneDividerRef.value.previousElementSibling
  const nextPane = appPaneDividerRef.value.nextElementSibling
  if (!(prevPane instanceof HTMLElement && nextPane instanceof HTMLElement)) {
    return
  }

  prevPane.style.transition = '0.3s ease-in-out'

  const direction = ['up', 'down'].some((v) => v === props.placement) ? 'height' : 'width'

  switch (props.placement) {
    case 'right':
    case 'down':
      if (isExpand) {
        expandNext(prevPane, nextPane, direction)
      } else {
        foldNext(prevPane, nextPane, direction)
      }
      break
    case 'left':
    case 'up':
      if (isExpand) {
        expandPrev(prevPane, direction)
      } else {
        foldPrev(prevPane, direction)
      }
    default:
      break
  }

  setTimeout(() => {
    prevPane.style.transition = ''
  }, 300)
}

function getDirectionNames(direction: 'width' | 'height'): {
  minDirection: 'minWidth' | 'minHeight'
  beforeMinDirection: 'beforeMinWidth' | 'beforeMinHeight'
} {
  const minDirection = direction === 'width' ? 'minWidth' : 'minHeight'
  const beforeMinDirection = direction === 'width' ? 'beforeMinWidth' : 'beforeMinHeight'
  return { minDirection, beforeMinDirection }
}

function foldNext(prevPane: HTMLElement, nextPane: HTMLElement, direction: 'width' | 'height') {
  const { minDirection, beforeMinDirection } = getDirectionNames(direction)

  nextPane.dataset[beforeMinDirection] = nextPane.style[minDirection]
  prevPane.dataset[direction] = prevPane.style[direction]

  const { [direction]: next } = nextPane.getBoundingClientRect()
  const { [direction]: pre } = prevPane.getBoundingClientRect()
  nextPane.style[minDirection] = 'auto'
  prevPane.style[direction] = `${pre + next - props.collapseSize}px`
}

function expandNext(prevPane: HTMLElement, nextPane: HTMLElement, direction: 'width' | 'height') {
  const { minDirection, beforeMinDirection } = getDirectionNames(direction)

  prevPane.style[direction] = prevPane.dataset[direction] ?? 'auto'
  setTimeout(() => {
    nextPane.style[minDirection] = nextPane.dataset[beforeMinDirection] ?? 'auto'
  }, TRANSITION_DURATION)
}

function foldPrev(prevPane: HTMLElement, direction: 'width' | 'height') {
  const { minDirection, beforeMinDirection } = getDirectionNames(direction)

  prevPane.dataset[beforeMinDirection] = prevPane.style[minDirection]
  prevPane.dataset[direction] = prevPane.style[direction]

  prevPane.style[minDirection] = 'auto'
  prevPane.style[direction] = `${props.collapseSize}px`
}

function expandPrev(prevPane: HTMLElement, direction: 'width' | 'height') {
  const { minDirection, beforeMinDirection } = getDirectionNames(direction)

  prevPane.style[direction] = prevPane.dataset[direction] ?? 'auto'

  setTimeout(() => {
    prevPane.style[minDirection] = prevPane.dataset[beforeMinDirection] ?? 'auto'
  }, TRANSITION_DURATION)
}

function fold() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div v-show="props.modelValue" class="app-pane-divider" ref="appPaneDividerRef">
    <div
      v-show="placement && props.modelValue"
      class="app-pane-divider-fold"
      :data-collapse-size="collapseSize"
      :class="`is-${placement}`"
      @pointerdown.stop="fold"
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
