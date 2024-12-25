import type { Component } from 'vue'
import MainTrackComp from '@/components/container/track/components/track-controller/components/track/MainTrack.vue'
import CommonTrackComp from '@/components/container/track/components/track-controller/components/track/CommonTrack.vue'
import AudioTrackComp from '@/components/container/track/components/track-controller/components/track/AudioTrack.vue'

export type MainTrackType = InstanceType<typeof MainTrackComp>
export type CommonTrackType = InstanceType<typeof CommonTrackComp>
export type AudioTrackType = InstanceType<typeof AudioTrackComp>

export enum ResourceType {
  VIDEO,
  TEXT,
  STICKER,
  AUDIO,
}

export enum ResourceComponentName {
  VIDEO_RESOURCE = 'VideoResource',
  TEXT_RESOURCE = 'TextResource',
}

export enum TrackComponentName {
  MAIN_TRACK = 'MainTrack',
  COMMON_TRACK = 'CommonTrack',
  AUDIO_TRACK = 'AudioTrack',
}

export interface MenuItem {
  componentName: ResourceComponentName
  IconComponent: Component
  name: string
}

export interface TextResource {
  type: ResourceType.TEXT
  name: string
  frameCount: number
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

export enum TrackPosition {
  Over,
  Main,
  Common,
  Audio,
  Interval,
  Under,
}

export interface BaseTrackPosition {
  top: number
}

export interface OverTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Over
}

export interface MainTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Main
}

export interface CommonTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Common
}

export interface AudioTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Audio
}

export interface IntervalTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Interval
}

export interface UnderTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Under
}

export type TrackPositionItem =
  | MainTrackPosition
  | CommonTrackPosition
  | AudioTrackPosition
  | OverTrackPosition
  | IntervalTrackPosition
  | UnderTrackPosition
