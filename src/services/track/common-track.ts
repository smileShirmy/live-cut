import { TrackComponentName, type CommonTrackItem } from '@/types/track'
import { ref } from 'vue'

export class CommonTrack {
  readonly componentName = TrackComponentName.MAIN_TRACK

  private _items = ref<CommonTrackItem[]>([])

  get items() {
    return this._items
  }

  addItem(item: CommonTrackItem) {
    this._items.value.push(item)
  }
}
