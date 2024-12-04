<script setup lang="ts">
import TimelineRuler from './components/timeline-ruler/TimelineRuler.vue'
import TimelineCursor from './components/timeline-cursor/TimelineCursor.vue'
import TrackScrollbar from './components/scrollbar/TrackScrollbar.vue'
import { usePlayerStore } from '@/stores/player'
import { ref } from 'vue'
import { useTrackStore } from '@/stores/track'
import { TRACK_RESOURCE_OFFSET_LEFT } from '@/config'

const playerStore = usePlayerStore()
const trackStore = useTrackStore()

const trackControllerRef = ref<HTMLDivElement>()

function onClick({ clientX }: MouseEvent) {
  if (!trackControllerRef.value) return

  const { left } = trackControllerRef.value.getBoundingClientRect()
  const offsetLeft = left + TRACK_RESOURCE_OFFSET_LEFT
  if (clientX < offsetLeft) {
    return
  }

  const currentFrame = Math.round(
    (clientX - offsetLeft + trackStore.scrollLeftTrackWidth) / trackStore.frameWidth,
  )
  playerStore.setCurrentFrame(currentFrame)
}
</script>

<template>
  <div ref="trackControllerRef" class="track-controller">
    <TimelineRuler @click="onClick" />
    <TimelineCursor />

    <div class="track-content" @click="onClick">
      <div class="track-list-container">
        <div v-for="i in 10" :key="i" class="track-item-container">
          <div class="track-item-options"></div>
          <div class="track-item-wrapper">
            <div class="track-item"></div>
          </div>
        </div>
      </div>
    </div>

    <TrackScrollbar />
  </div>
</template>

<style lang="scss" scoped>
.track-controller {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: calc(100% - 30px);

  .track-content {
    box-sizing: border-box;
    height: calc(100% - 36px);
    padding: 80px 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .track-list-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 100%;
  }

  .track-item-container {
    display: flex;
    width: 100%;
    height: 60px;

    + .track-item-container {
      margin-top: 8px;
    }
  }

  .track-item-options {
    flex-shrink: 0;
    width: 80px;
    height: 100%;
  }

  .track-item-wrapper {
    flex: 1;
    position: relative;
    overflow: hidden;

    .track-item {
      position: absolute;
      top: 0;
      left: 0;
      width: 2000px;
      height: 100%;
      background-color: #000;
    }
  }
}
</style>
