import { TrackComponentName, type MainTrackItem } from '@/types/track'
import { BaseTrack } from './base-track'
import { watch } from 'vue'

export class MainTrack extends BaseTrack<MainTrackItem> {
  readonly componentName = TrackComponentName.MAIN_TRACK

  constructor() {
    super()

    this.setParentTrack()
  }

  setParentTrack() {
    watch(this.items, (items) => items.forEach((v) => v.setParentTrack(this)), {
      immediate: true,
    })
  }

  static create(...args: ConstructorParameters<typeof MainTrack>) {
    return new MainTrack(...args)
  }
}
