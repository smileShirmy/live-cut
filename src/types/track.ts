import MainTrackComp from '@/components/container/track/components/track-controller/components/track/MainTrack.vue'
import CommonTrackComp from '@/components/container/track/components/track-controller/components/track/CommonTrack.vue'
import AudioTrackComp from '@/components/container/track/components/track-controller/components/track/AudioTrack.vue'

export type MainTrackType = InstanceType<typeof MainTrackComp>
export type CommonTrackType = InstanceType<typeof CommonTrackComp>
export type AudioTrackType = InstanceType<typeof AudioTrackComp>

export enum TrackComponentName {
  MAIN_TRACK = 'MainTrack',
  COMMON_TRACK = 'CommonTrack',
  AUDIO_TRACK = 'AudioTrack',
}

export interface MainTrack {
  componentName: TrackComponentName.MAIN_TRACK
  itemList: []
}

export interface CommonTrack {
  componentName: TrackComponentName.COMMON_TRACK
  itemList: []
}

export interface AudioTrack {
  componentName: TrackComponentName.AUDIO_TRACK
  itemList: []
}

export type Track = MainTrack | CommonTrack | AudioTrack

export type TrackComponent = MainTrackType | CommonTrackType | AudioTrackType
