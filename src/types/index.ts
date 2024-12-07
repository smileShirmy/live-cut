import type { Component } from 'vue'

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
