<script setup lang="ts">
import TimelineRuler from './components/timeline-ruler/TimelineRuler.vue'
import TimelineCursor from './components/timeline-cursor/TimelineCursor.vue'
import TrackScrollbar from './components/scrollbar/TrackScrollbar.vue'
import MainTrack from './components/track/MainTrack.vue'
import AudioTrack from './components/track/AudioTrack.vue'
import CommonTrack from './components/track/CommonTrack.vue'
import { usePlayerStore } from '@/stores/player'
import { useTrackStore } from '@/stores/track'
import { TRACK_RESOURCE_OFFSET_LEFT } from '@/config'
import { TrackComponentName, type Track, type TrackComponent } from '@/types/track'
import { computed, ref, useTemplateRef, type ComputedRef, type CSSProperties } from 'vue'
import { Events, emitter } from '@/services/mitt/emitter'
import { DragStateType, TrackPosition, type TrackPositionData } from '@/types/drag'
import { useDragStore } from '@/stores/drag'

defineOptions({
  components: {
    [TrackComponentName.MAIN_TRACK]: MainTrack,
    [TrackComponentName.COMMON_TRACK]: CommonTrack,
    [TrackComponentName.AUDIO_TRACK]: AudioTrack,
  },
})

const trackList = ref<Track[]>([
  {
    componentName: TrackComponentName.MAIN_TRACK,
    itemList: [],
  },
])

const playerStore = usePlayerStore()
const trackStore = useTrackStore()
const dragStore = useDragStore()

const trackControllerRef = useTemplateRef<HTMLDivElement>('trackControllerRef')
const trackContentRef = useTemplateRef<HTMLDivElement>('trackContentRef')
const trackRefs = useTemplateRef<TrackComponent[]>('trackRefs')
const trackListContainerRef = useTemplateRef<HTMLDivElement>('trackListContainerRef')

const addToNewTrackLineStyle: ComputedRef<CSSProperties> = computed(() => {
  console.log(dragStore.dragState?.top)
  if (dragStore.dragState && dragStore.dragState.type === DragStateType.ADD_TO_NEW_TRACK) {
    return {
      top: `${dragStore.dragState.top}px`,
    }
  }
  return {}
})

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

emitter.on(Events.INIT_TRACK_POSITIONS, (set) => {
  if (!trackRefs.value || !trackListContainerRef.value) {
    return
  }

  let trackPositions: { type: TrackPosition; rect: DOMRect }[] = []
  for (const track of trackRefs.value) {
    trackPositions.push({
      type: track.position,
      rect: track.$el.getBoundingClientRect(),
    })
  }
  trackPositions = trackPositions.sort((a, b) => a.rect.top - b.rect.top)

  const { top: listTop } = trackListContainerRef.value.getBoundingClientRect()
  const positions: TrackPositionData[] = []
  const len = trackPositions.length
  for (let i = 0; i < len; i += 1) {
    const track = trackPositions[i]

    if (i === 0) {
      positions.push({
        type: TrackPosition.Over,
        top: listTop,
      })
    }

    positions.push(
      {
        type: track.type,
        top: track.rect.top,
      },
      {
        type: TrackPosition.Interval,
        top: track.rect.bottom + 1,
      },
    )

    if (i === len - 1) {
      positions.push({
        type: TrackPosition.Under,
        top: track.rect.bottom + 1,
      })
    }
  }

  set(positions)
})

emitter.on(Events.INIT_TRACK_CONTENT_TOP, (set) => {
  if (!trackContentRef.value) return
  const { top } = trackContentRef.value.getBoundingClientRect()
  set(top)
})
</script>

<template>
  <div ref="trackControllerRef" class="track-controller">
    <TimelineRuler @click="onClick" />
    <TimelineCursor />

    <div class="track-content" ref="trackContentRef" @click="onClick">
      <div class="track-list-container" ref="trackListContainerRef">
        <component
          v-for="(track, i) in trackList"
          ref="trackRefs"
          :key="i"
          class="track-container"
          :is="track.componentName"
          :track="track"
        ></component>
      </div>

      <div class="add-to-new-track-line" :style="addToNewTrackLineStyle"></div>
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
    position: relative;
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

  .add-to-new-track-line {
    position: absolute;
    right: 0;
    width: calc(100% - 80px);
    height: 1px;
    background-color: #7086e9;
    pointer-events: none;
  }
}
</style>
