import type { Component } from 'vue'
import type { Millisecond } from './general'

export enum ResourceComponentName {
  VIDEO_RESOURCE = 'VideoResource',
  TEXT_RESOURCE = 'TextResource',
}

export interface MenuItem {
  componentName: ResourceComponentName
  IconComponent: Component
  name: string
}

export enum ResourceType {
  VIDEO,
  TEXT,
  STICKER,
  AUDIO,
}

export interface VideoResource {
  type: ResourceType.VIDEO
  name: string
  duration: Millisecond
}

export interface TextResource {
  type: ResourceType.TEXT
  name: string
  duration: Millisecond
}

export type ResourceData = VideoResource | TextResource
