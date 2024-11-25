<script setup lang="ts">
import { Undo as IconUndo } from '@icon-park/vue-next'
import { Redo as IconRedo } from '@icon-park/vue-next'
import { Delete as IconDelete } from '@icon-park/vue-next'
import { CuttingOne as IconCuttingOne } from '@icon-park/vue-next'
import { AlignRight as IconAlignRight } from '@icon-park/vue-next'
import { AddSubset as IconAddSubset } from '@icon-park/vue-next'
import { BringToFront as IconBringToFront } from '@icon-park/vue-next'
import { AutoWidthOne as IconAutoWidthOne } from '@icon-park/vue-next'
import { computed } from 'vue'
import ScaleSlider from './ScaleSlider.vue'
import { useTrackStore } from '@/store/track'

const trackStore = useTrackStore()

const scaleLevel = computed(() => trackStore.scaleLevel)

function onScaleLevelChange(scaleLevel: number) {
  trackStore.setScaleLevel(scaleLevel)
}

function split() {
  // TODO:
}

function removeSelected() {
  // TODO:
}

function undo() {
  // TODO:
}

function redo() {
  // TODO:
}
</script>

<template>
  <div class="control-bar">
    <section class="control-bar-child">
      <AppPopper class="popper-item" content="撤销" hover>
        <div class="control-item" :class="{ disabled: true }" @click="undo">
          <IconUndo class="icon" />
        </div>
      </AppPopper>
      <AppPopper class="popper-item" content="重做" hover>
        <div
          class="control-item"
          :class="{
            disabled: true,
          }"
          @click="redo"
        >
          <IconRedo class="icon" />
        </div>
      </AppPopper>
      <AppPopper class="popper-item" content="删除" hover>
        <div class="control-item" :class="{ disabled: false }" @click="removeSelected">
          <IconDelete class="icon" />
        </div>
      </AppPopper>
      <AppPopper class="popper-item" content="分割" hover>
        <div class="control-item" :class="{ disabled: true }" @click="split">
          <IconCuttingOne class="icon" />
        </div>
      </AppPopper>
    </section>

    <section class="control-bar-child">
      <AppPopper class="popper-item" hover :content="true ? '关闭自动磁吸' : '打开自动磁吸'">
        <div class="track-control-item" :class="{ enable: true }">
          <IconAddSubset theme="filled" class="track-icon" />
        </div>
      </AppPopper>
      <AppPopper class="popper-item" hover :content="true ? '关闭自动吸附' : '打开自动吸附'">
        <div class="track-control-item" :class="{ enable: true }">
          <IconBringToFront theme="filled" class="track-icon" />
        </div>
      </AppPopper>
      <AppPopper class="popper-item" hover :content="true ? '关闭预览线' : '打开预览线'">
        <div class="track-control-item" :class="{ enable: true }">
          <IconAlignRight theme="filled" class="track-icon" />
        </div>
      </AppPopper>
      <div class="split-line"></div>
      <AppPopper hover content="自适应轨道">
        <div class="control-item adaptive-item" :class="{ disabled: true }">
          <IconAutoWidthOne class="icon" />
        </div>
      </AppPopper>

      <ScaleSlider v-model="scaleLevel" @change="onScaleLevelChange" :disabled="false" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.control-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding: 0 12px;
  background-color: var(--app-bg-color-light);
  border-bottom: 1px solid var(--app-bg-color-blank);
  user-select: none;

  .control-bar-child {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .popper-item {
    margin: 0 6px;
  }

  .control-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    cursor: pointer;

    &:not(.disabled):hover {
      background-color: var(--app-bg-color-extra-lighter);
    }

    &.disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .icon {
      font-size: 16px;
      color: var(--app-color-white);
    }
  }

  .track-control-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    cursor: pointer;

    &.enable {
      background-color: var(--app-bg-color-dark);

      .track-icon {
        font-size: 16px;
        color: var(--app-color-theme);
      }
    }

    &:not(.enable):hover {
      background-color: var(--app-bg-color-extra-lighter);
    }

    .track-icon {
      font-size: 16px;
      color: var(--app-color-white);
    }
  }

  .adaptive-item {
    margin-right: 12px;
  }

  .split-line {
    margin: 0 6px;
    width: 1px;
    height: 18px;
    background-color: var(--app-bg-color-lighter);
  }
}
</style>
