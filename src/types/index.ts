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
