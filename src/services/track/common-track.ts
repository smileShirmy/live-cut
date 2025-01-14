import { TrackComponentName, type CommonTrackItem } from '@/types/track'
import { BaseTrack } from './base-track'

export class CommonTrack extends BaseTrack<CommonTrackItem> {
  readonly componentName = TrackComponentName.MAIN_TRACK

  static create(...args: ConstructorParameters<typeof CommonTrack>) {
    return new CommonTrack(...args)
  }
}
