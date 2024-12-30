import {
  TrackPosition,
  type DragOptions,
  type MainTrackPosition,
  type TrackPositionData,
} from '@/types/drag'
import { BaseDrag } from './base-drag'
import { INTERVAL_TOP_OFFSET } from '@/config'
import { warn } from 'vue'
import type { VideoResource } from '@/types/resource'

export class DragCommon extends BaseDrag {
  #dragResource: VideoResource

  constructor(options: DragOptions<VideoResource>) {
    super(options)
    this.#dragResource = options.dragResource
    this.addListener()
  }

  static dragStart(options: DragOptions<VideoResource>) {
    return new DragCommon(options)
  }

  protected addListener() {
    window.addEventListener('pointermove', this.onDragging)
    window.addEventListener('pointerup', this.onDragEnd)
  }

  protected removeListener() {
    window.removeEventListener('pointermove', this.onDragging)
    window.removeEventListener('pointerup', this.onDragEnd)
  }

  protected onDragging = (event: PointerEvent) => {
    if (!this.dragging) return

    const { clientX, clientY } = event

    this.updateCloneStyle(clientX, clientY)

    const { position, main } = this.getTrackPosition(clientY)

    switch (position.type) {
      case TrackPosition.Over:
        this.#overHandler(position)
        break
      case TrackPosition.Common:
      case TrackPosition.Main:
        this.#trackHandler(position, clientX)
        break
      case TrackPosition.Interval:
        this.#intervalHandler(position, main)
        break
      case TrackPosition.Audio:
      case TrackPosition.Under:
        this.#underHandler(main)
        break
      default:
        warn('has unhandled position type')
        break
    }
  }

  #overHandler(position: TrackPositionData) {
    this.updateAddToNewTrackState({
      top: this.toContentTop(position.bottom) - INTERVAL_TOP_OFFSET,
    })
  }

  #trackHandler(position: TrackPositionData, clientX: number) {
    this.updateAddToCurrentTrackState({
      top: this.toContentTop(position.top),
      left: this.toContentLeft(clientX),
      width: this.trackStore.durationToWidth(this.#dragResource.duration),
      height: position.height,
    })
  }

  #intervalHandler(position: TrackPositionData, main: MainTrackPosition) {
    if (position.top < main.bottom) {
      this.updateAddToNewTrackState({
        top: this.toContentTop(main.bottom) + INTERVAL_TOP_OFFSET,
      })
    } else {
      this.updateAddToNewTrackState({
        top: this.toContentTop(position.top) + INTERVAL_TOP_OFFSET,
      })
    }
  }

  #underHandler(main: MainTrackPosition) {
    this.updateAddToNewTrackState({
      top: this.toContentTop(main.bottom) + INTERVAL_TOP_OFFSET,
    })
  }

  protected onDragEnd = () => {
    this.cloneDragTarget.remove()
    this.dragging = false
    this.removeListener()
  }
}
