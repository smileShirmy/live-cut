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
import { TrackComponentName, type TrackComponent } from '@/types/track'
import { computed, useTemplateRef, type ComputedRef, type CSSProperties } from 'vue'
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

const playerStore = usePlayerStore()
const trackStore = useTrackStore()
const dragStore = useDragStore()

const trackControllerRef = useTemplateRef<HTMLDivElement>('trackControllerRef')
const trackContentRef = useTemplateRef<HTMLDivElement>('trackContentRef')
const trackRefs = useTemplateRef<TrackComponent[]>('trackRefs')
const trackListContainerRef = useTemplateRef<HTMLDivElement>('trackListContainerRef')

const dragStateType = computed(() => dragStore.dragState?.type ?? null)

const addToNewTrackLineStyle: ComputedRef<CSSProperties> = computed(() => {
  if (dragStore.dragState && dragStore.dragState.type === DragStateType.ADD_TO_NEW_TRACK) {
    return {
      top: `${dragStore.dragState.top}px`,
    }
  }
  return { display: 'none' }
})

const addToCurrentTrackRectStyle: ComputedRef<CSSProperties> = computed(() => {
  if (dragStore.dragState && dragStore.dragState.type === DragStateType.ADD_TO_CURRENT_TRACK) {
    const { top, left, width, height } = dragStore.dragState
    if (left > TRACK_RESOURCE_OFFSET_LEFT) {
      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
      }
    }
  }
  return { display: 'none' }
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

  let trackPositions: {
    type: TrackPosition.Main | TrackPosition.Audio | TrackPosition.Common
    rect: DOMRect
  }[] = []
  for (const track of trackRefs.value) {
    trackPositions.push({
      type: track.position,
      rect: track.$el.getBoundingClientRect(),
    })
  }
  trackPositions = trackPositions.sort((a, b) => a.rect.top - b.rect.top)

  const {
    top: listTop,
    height: listHeight,
    bottom: listBottom,
  } = trackListContainerRef.value.getBoundingClientRect()
  const positions: TrackPositionData[] = []
  const len = trackPositions.length
  for (let i = 0; i < len; i += 1) {
    const cur = trackPositions[i]
    const next = trackPositions[i + 1]

    if (i === 0) {
      positions.push({
        type: TrackPosition.Over,
        top: listTop,
        height: listHeight,
        bottom: cur.rect.top,
      })
    }

    positions.push({
      type: cur.type,
      top: cur.rect.top,
      height: cur.rect.height,
      bottom: cur.rect.bottom,
      index: i,
    })

    if (i < len - 1) {
      positions.push({
        type: TrackPosition.Interval,
        top: cur.rect.bottom,
        height: next.rect.top - cur.rect.bottom,
        bottom: next.rect.top,
        insertIndex: i + 1,
      })
    }

    if (i === len - 1) {
      positions.push({
        type: TrackPosition.Under,
        top: cur.rect.bottom,
        height: listBottom - cur.rect.bottom,
        bottom: listBottom,
      })
    }
  }

  set(positions)
})

emitter.on(Events.INIT_TRACK_CONTENT_RECT, (set) => {
  if (!trackContentRef.value) return
  const rect = trackContentRef.value.getBoundingClientRect()
  set(rect)
})
</script>

<template>
  <div ref="trackControllerRef" class="track-controller">
    <TimelineRuler @click="onClick" />
    <TimelineCursor />

    <div class="track-content" ref="trackContentRef" @click="onClick">
      <div class="track-list-container" ref="trackListContainerRef">
        <component
          v-for="(track, i) in trackStore.trackList"
          ref="trackRefs"
          :key="i"
          class="track-container"
          :is="track.componentName"
          :track="track"
        ></component>
      </div>

      <div
        v-show="dragStateType === DragStateType.ADD_TO_NEW_TRACK"
        class="add-to-new-track-line"
        :style="addToNewTrackLineStyle"
      ></div>
      <div
        v-show="dragStateType === DragStateType.ADD_TO_CURRENT_TRACK"
        class="add-to-current-track-rect"
        :style="addToCurrentTrackRectStyle"
      ></div>
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

  .add-to-current-track-rect {
    box-sizing: border-box;
    position: absolute;
    background-color: rgba(#7086e9, 0.2);
    border: 2px dashed rgba(#7086e9, 0.5);
    border-radius: 4px;
    pointer-events: none;
  }
}
</style>
