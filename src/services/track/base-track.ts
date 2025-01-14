import type { TrackComponentName } from '@/types/track'
import type { TrackItem } from '@/types/track-item'
import { shallowReactive } from 'vue'

export abstract class BaseTrack<T extends TrackItem> {
  abstract readonly componentName: TrackComponentName

  private readonly _items = shallowReactive<T[]>([])

  get items() {
    return this._items
  }

  /**
   * 关联 trackItem 和 track
   */
  abstract setParentTrack(): void

  addItem(item: T) {
    this._items.push(item)
  }
}
