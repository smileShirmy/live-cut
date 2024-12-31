import { TrackComponentName, type MainTrackItem } from '@/types/track'
import { shallowReactive } from 'vue'

export class MainTrack {
  readonly componentName = TrackComponentName.MAIN_TRACK

  private readonly _items = shallowReactive<MainTrackItem[]>([])

  get items() {
    return this._items
  }

  addItem(item: MainTrackItem) {
    this._items.push(item)
  }

  static create(...args: ConstructorParameters<typeof MainTrack>) {
    return new MainTrack(...args)
  }
}
