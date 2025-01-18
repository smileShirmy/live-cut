import { TrackComponentName } from '@/types/track'
import type { AudioTrackItem } from '../track-item/audio-track-item'
import { BaseTrack } from './base-track'
import { watch } from 'vue'

export class AudioTrack extends BaseTrack<AudioTrackItem> {
  readonly componentName = TrackComponentName.AUDIO_TRACK

  constructor() {
    super()

    this.setParentTrack()
  }

  setParentTrack() {
    watch(this.items, (items) => items.forEach((v) => v.setParentTrack(this)), {
      immediate: true,
    })
  }

  static create(...args: ConstructorParameters<typeof AudioTrack>) {
    return new AudioTrack(...args)
  }
}
