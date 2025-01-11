import { TrackItemComponentName } from '@/types/track-item'
import { BaseTrackItem } from './base-track-item'
import type { AudioResource } from '@/types/resource'

export class AudioTrackItem extends BaseTrackItem {
  readonly componentName = TrackItemComponentName.AUDIO_TRACK_ITEM

  constructor(item: AudioResource) {
    super(item)
  }

  static create(...args: ConstructorParameters<typeof AudioTrackItem>) {
    return new AudioTrackItem(...args)
  }
}
