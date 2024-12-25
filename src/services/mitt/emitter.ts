import mitt from 'mitt'

export enum Events {
  INIT_TRACK_POSITIONS = 'initTrackPositions',
}

const emitter = mitt<{
  [Events.INIT_TRACK_POSITIONS]: undefined
}>()

export { emitter }
