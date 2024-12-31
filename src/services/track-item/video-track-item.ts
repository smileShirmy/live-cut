import type { VideoResource } from '@/types/resource'
import { TrackItemComponentName } from '@/types/track-item'

export class VideoTrackItem {
  readonly componentName = TrackItemComponentName.VIDEO_TRACK_ITEM

  #startTime = 0

  #duration = 0

  get startTime() {
    return this.#startTime
  }

  get duration() {
    return this.#duration
  }

  constructor(
    item: VideoResource,
    options?: {
      startTime?: number
    },
  ) {
    this.#duration = item.duration

    if (options) {
      const { startTime = 0 } = options
      this.#startTime = startTime
    }
  }

  setStartTime(time: number) {
    this.#startTime = time
  }

  static create(...args: ConstructorParameters<typeof VideoTrackItem>) {
    return new VideoTrackItem(...args)
  }
}
