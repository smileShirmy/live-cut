import MainTrackComp from '@/components/container/track/components/track-controller/components/track/MainTrack.vue'
import CommonTrackComp from '@/components/container/track/components/track-controller/components/track/CommonTrack.vue'
import AudioTrackComp from '@/components/container/track/components/track-controller/components/track/AudioTrack.vue'
import type { VideoTrackItem } from '@/services/track-item/video-track-item'
import type { MainTrack } from '@/services/track/main-track'

export type MainTrackType = InstanceType<typeof MainTrackComp>
export type CommonTrackType = InstanceType<typeof CommonTrackComp>
export type AudioTrackType = InstanceType<typeof AudioTrackComp>

export enum TrackComponentName {
  MAIN_TRACK = 'MainTrack',
  COMMON_TRACK = 'CommonTrack',
  AUDIO_TRACK = 'AudioTrack',
}

export type Track = MainTrack

export type TrackComponent = MainTrackType | CommonTrackType | AudioTrackType

export type MainTrackItem = VideoTrackItem

export type CommonTrackItem = VideoTrackItem
