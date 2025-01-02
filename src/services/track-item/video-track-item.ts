import type { VideoResource } from '@/types/resource'
import { TrackItemComponentName } from '@/types/track-item'

export class VideoTrackItem {
  readonly componentName = TrackItemComponentName.VIDEO_TRACK_ITEM

  #startFrame = 0

  #duration = 0

  get startFrame() {
    return this.#startFrame
  }

  get duration() {
    return this.#duration
  }

  constructor(
    item: VideoResource,
    options?: {
      startFrame?: number
    },
  ) {
    this.#duration = item.duration

    if (options) {
      const { startFrame = 0 } = options
      this.#startFrame = startFrame
    }
  }

  setStartFrame(time: number) {
    this.#startFrame = time
  }

  static create(...args: ConstructorParameters<typeof VideoTrackItem>) {
    return new VideoTrackItem(...args)
  }
}
