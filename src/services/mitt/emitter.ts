import type { DropArea, TrackPositionData } from '@/types/drag'
import mitt from 'mitt'

export enum Events {
  INIT_TRACK_POSITIONS = 'initTrackPositions',
  INIT_DROP_AREA = 'initDropArea',
  INIT_TRACK_CONTENT_RECT = 'initTrackContentRect',
}

const emitter = mitt<{
  [Events.INIT_TRACK_POSITIONS]: (data: TrackPositionData[]) => void
  [Events.INIT_DROP_AREA]: (data: DropArea) => void
  [Events.INIT_TRACK_CONTENT_RECT]: (rect: DOMRect) => void
}>()

export { emitter }
