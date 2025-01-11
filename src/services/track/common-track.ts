import { TrackComponentName, type CommonTrackItem } from '@/types/track'
import { shallowReactive } from 'vue'

export class CommonTrack {
  readonly componentName = TrackComponentName.MAIN_TRACK

  private readonly _items = shallowReactive<CommonTrackItem[]>([])

  get items() {
    return this._items
  }

  addItem(item: CommonTrackItem) {
    this._items.push(item)
  }
}
