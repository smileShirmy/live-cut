import { TrackComponentName, type CommonTrackItem } from '@/types/track'
import { BaseTrack } from './base-track'
import { watch } from 'vue'

export class CommonTrack extends BaseTrack<CommonTrackItem> {
  readonly componentName = TrackComponentName.COMMON_TRACK

  constructor() {
    super()

    this.setParentTrack()
  }

  setParentTrack() {
    watch(this.items, (items) => items.forEach((v) => v.setParentTrack(this)), {
      immediate: true,
    })
  }

  static create(...args: ConstructorParameters<typeof CommonTrack>) {
    return new CommonTrack(...args)
  }
}
