import mitt from 'mitt'

export enum Events {
  INIT_TRACK_POSITIONS = 'initTrackPositions',
  INIT_DRAG_RECT = 'initDropArea',
}

const emitter = mitt<{
  [Events.INIT_TRACK_POSITIONS]: undefined
  [Events.INIT_DRAG_RECT]: undefined
}>()

export { emitter }
