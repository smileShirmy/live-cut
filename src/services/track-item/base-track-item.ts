import type { Millisecond } from '@/types/general'
import type { BaseTrackItemOptions, TrackItemComponentName } from '@/types/track-item'
import { ref } from 'vue'

export abstract class BaseTrackItem {
  abstract readonly componentName: TrackItemComponentName

  private _startFrame = ref<number>(0)

  private _duration = ref<Millisecond>(0)

  get startFrame() {
    return this._startFrame.value
  }

  get duration() {
    return this._duration.value
  }

  constructor(options: BaseTrackItemOptions) {
    this._duration.value = options.duration
  }

  setStartFrame(startFrame: number) {
    this._startFrame.value = startFrame
  }

  setDuration(duration: Millisecond) {
    this._duration.value = duration
  }
}
