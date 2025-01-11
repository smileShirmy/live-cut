import type { AudioTrackItem } from '@/services/track-item/audio-track-item'
import type { VideoTrackItem } from '@/services/track-item/video-track-item'
import type { Millisecond } from './general'

export enum TrackItemComponentName {
  VIDEO_TRACK_ITEM = 'VideoTrackItem',
  AUDIO_TRACK_ITEM = 'AudioTrackItem',
}

export interface BaseTrackItemOptions {
  duration: Millisecond
}

export type TrackItem = VideoTrackItem | AudioTrackItem
