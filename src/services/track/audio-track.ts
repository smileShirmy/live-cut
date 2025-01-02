import { TrackComponentName } from '@/types/track'
import { shallowReactive } from 'vue'
import type { AudioTrackItem } from '../track-item/audio-track-item'

export class AudioTrack {
  readonly componentName = TrackComponentName.MAIN_TRACK

  private readonly _items = shallowReactive<AudioTrackItem[]>([])

  get items() {
    return this._items
  }

  addItem(item: AudioTrackItem) {
    this._items.push(item)
  }

  static create(...args: ConstructorParameters<typeof AudioTrack>) {
    return new AudioTrack(...args)
  }
}
