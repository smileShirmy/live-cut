<script setup lang="ts">
import { frameToTime } from '@/services/helpers/time'
import { usePlayerStore } from '@/store/player'
import { PlayOne as IconPlayOne } from '@icon-park/vue-next'
import { Pause as IconPause } from '@icon-park/vue-next'
import { GoStart as IconGoStart } from '@icon-park/vue-next'
import { GoEnd as IconGoEnd } from '@icon-park/vue-next'
import { Cutting as IconCutting } from '@icon-park/vue-next'
import { FullScreenTwo as IconFullScreenTwo } from '@icon-park/vue-next'
import { computed, ref } from 'vue'

const playerStore = usePlayerStore()

const playing = ref(true)

const currentTime = computed(() => frameToTime(playerStore.currentFrame))
</script>

<template>
  <div class="player-controls">
    <div class="time-wrapper">
      <AppPopper content="当前时间点" hover>
        <time class="current-time"
          >{{ currentTime.time }}<span class="second-frame">.{{ currentTime.frame }}</span></time
        >
      </AppPopper>

      <div class="split-line"></div>

      <AppPopper content="轨道总时长" hover>
        <time class="total-time">00:01:00<span class="second-frame">.22</span></time>
      </AppPopper>
    </div>

    <div class="controls">
      <div
        class="controls-btn"
        :class="{
          disabled: false,
        }"
      >
        <IconGoStart class="controls-icon" />
      </div>
      <div
        class="controls-btn"
        :class="{
          disabled: false,
        }"
      >
        <IconPause class="controls-icon" v-show="playing" />
        <IconPlayOne theme="filled" class="controls-icon" v-show="!playing" />
      </div>
      <div
        class="controls-btn"
        :class="{
          disabled: true,
        }"
      >
        <IconGoEnd class="controls-icon" />
      </div>
    </div>

    <div class="handler-wrapper">
      <AppPopper class="popper-item" content="画面裁切" hover>
        <div class="handler-item">
          <IconCutting class="handler-icon" />
        </div>
      </AppPopper>
      <AppPopper class="popper-item" content="画面切幅" hover>
        <div class="handler-item aspect-ratio">16:9</div>
      </AppPopper>
      <AppPopper class="popper-item" content="全屏播放" hover>
        <div class="handler-item" title="全屏播放">
          <IconFullScreenTwo class="handler-icon" />
        </div>
      </AppPopper>
    </div>
  </div>
</template>

<style scoped lang="scss">
.player-controls {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 0 12px;
  width: 100%;
  height: 32px;
  background-color: var(--app-bg-color);
  user-select: none;

  .time-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: var(--app-font-size-small);

    .split-line {
      margin: 0 10px;
      width: 1px;
      height: 10px;
      background-color: var(--app-bg-color-lighter);
    }

    .current-time {
      color: var(--app-color-theme);
    }

    .total-time {
      color: var(--app-color-white);
    }

    .second-frame {
      opacity: 0.6;
    }
  }

  .controls {
    flex-shrink: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > .controls-btn {
      cursor: pointer;

      + .controls-btn {
        margin-left: 20px;
      }

      &.disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }

    .controls-icon {
      font-size: 20px;
      color: var(--app-text-color-primary);

      &:hover {
        color: var(--app-text-color-regular);
      }
    }
  }

  .handler-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .popper-item {
      + .popper-item {
        margin-left: 16px;
      }
    }

    .handler-item {
      cursor: pointer;

      .handler-icon {
        font-size: 16px;
        color: var(--app-text-color-primary);

        &:hover {
          color: var(--app-color-white);
        }
      }

      &.aspect-ratio {
        border: 1px solid var(--app-text-color-primary);
        padding: 0 7px;
        height: 16px;
        line-height: 14px;
        border-radius: 2px;
        font-size: var(--app-font-size-small);
        color: var(--app-text-color-primary);
        text-align: center;

        &:hover {
          border-color: var(--app-color-white);
        }
      }

      &:hover {
        color: var(--app-color-white);
      }
    }
  }
}
</style>
