import {
  TrackComponentName,
  type AudioTrackType,
  type CommonTrackType,
  type MainTrackType,
  type TrackComponent,
} from '@/types'

export const isMainTrackComp = (comp: TrackComponent): comp is MainTrackType =>
  comp.track.componentName === TrackComponentName.MAIN_TRACK

export const isCommonTrackComp = (comp: TrackComponent): comp is CommonTrackType =>
  comp.track.componentName === TrackComponentName.COMMON_TRACK

export const isAudioTrackComp = (comp: TrackComponent): comp is AudioTrackType =>
  comp.track.componentName === TrackComponentName.AUDIO_TRACK
