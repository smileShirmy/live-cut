<script setup lang="ts">
import TimelineRuler from './components/timeline-ruler/TimelineRuler.vue'
import TimelineCursor from './components/timeline-cursor/TimelineCursor.vue'
import TrackScrollbar from './components/scrollbar/TrackScrollbar.vue'
import MainTrack from './components/track/MainTrack.vue'
import AudioTrack from './components/track/AudioTrack.vue'
import { usePlayerStore } from '@/stores/player'
import { useTrackStore } from '@/stores/track'
import { TRACK_RESOURCE_OFFSET_LEFT } from '@/config'
import { TrackComponentName, type Track } from '@/types'
import { ref } from 'vue'
import CommonTrack from './components/track/CommonTrack.vue'

defineOptions({
  components: {
    [TrackComponentName.MAIN_TRACK]: MainTrack,
    [TrackComponentName.COMMON_TRACK]: CommonTrack,
    [TrackComponentName.AUDIO_TRACK]: AudioTrack,
  },
})

const trackList = ref<Track[]>([
  {
    componentName: TrackComponentName.COMMON_TRACK,
    itemList: [],
  },
  // {
  //   componentName: TrackComponentName.COMMON_TRACK,
  //   itemList: [],
  // },
  // {
  //   componentName: TrackComponentName.COMMON_TRACK,
  //   itemList: [],
  // },
  // {
  //   componentName: TrackComponentName.COMMON_TRACK,
  //   itemList: [],
  // },
  // {
  //   componentName: TrackComponentName.COMMON_TRACK,
  //   itemList: [],
  // },
  // {
  //   componentName: TrackComponentName.COMMON_TRACK,
  //   itemList: [],
  // },
  // {
  //   componentName: TrackComponentName.COMMON_TRACK,
  //   itemList: [],
  // },
  {
    componentName: TrackComponentName.MAIN_TRACK,
    itemList: [],
  },
  {
    componentName: TrackComponentName.AUDIO_TRACK,
    itemList: [],
  },
])

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
        <component
          v-for="(track, i) in trackList"
          :key="i"
          class="track-container"
          :is="track.componentName"
          :track="track"
        ></component>
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
    overflow-x: hidden;
    overflow-y: auto;
  }

  .track-list-container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 80px 0;
    min-height: 100%;
  }

  .track-container {
    + .track-container {
      margin-top: 8px;
    }
  }
}
</style>
