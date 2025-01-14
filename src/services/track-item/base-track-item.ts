import type { Millisecond } from '@/types/general'
import type { BaseTrackItemOptions, TrackItemComponentName } from '@/types/track-item'
import { computed, ref } from 'vue'
import { durationToFrameCount } from '../helpers/time'
import type { Track } from '@/types/track'
import { uuid } from '../helpers/general'

export abstract class BaseTrackItem {
  abstract readonly componentName: TrackItemComponentName

  readonly id = uuid()

  private _startFrame = ref<number>(0)

  private _duration = ref<Millisecond>(0)

  private _startFrameOffset = ref<number>(0)

  private _endFrameOffset = ref<number>(0)

  private _parentTrack: Track | null = null

  currentStartFrame = computed<number>(() => this.startFrame + this.startFrameOffset)

  currentEndFrame = computed<number>(() => this.endFrame + this.endFrameOffset)

  currentFrameCount = computed<number>(
    () => this.currentEndFrame.value - this.currentStartFrame.value,
  )

  get startFrame() {
    return this._startFrame.value
  }

  get endFrame() {
    return this.startFrame + this.frameCount
  }

  get duration() {
    return this._duration.value
  }

  get frameCount() {
    return durationToFrameCount(this.duration)
  }

  get startFrameOffset() {
    return this._startFrameOffset.value
  }

  get endFrameOffset() {
    return this._endFrameOffset.value
  }

  get parentTrack() {
    return this._parentTrack
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

  setStartFrameOffset(offset: number) {
    this._startFrameOffset.value = offset
  }

  setEndFrameOffset(offset: number) {
    this._endFrameOffset.value = offset
  }

  setParentTrack(track: Track) {
    this._parentTrack = track
  }
}
