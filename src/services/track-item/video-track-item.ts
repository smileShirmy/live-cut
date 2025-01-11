import type { VideoResource } from '@/types/resource'
import { TrackItemComponentName } from '@/types/track-item'
import { BaseTrackItem } from './base-track-item'

export class VideoTrackItem extends BaseTrackItem {
  readonly componentName = TrackItemComponentName.VIDEO_TRACK_ITEM

  constructor(item: VideoResource) {
    super(item)
  }

  static create(...args: ConstructorParameters<typeof VideoTrackItem>) {
    return new VideoTrackItem(...args)
  }
}
