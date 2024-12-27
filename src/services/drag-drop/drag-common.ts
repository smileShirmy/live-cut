import { TrackPosition, type DragOptions, type TrackPositionData } from '@/types/drag'
import { BaseDrag } from './base-drag'
import { INTERVAL_TOP_OFFSET } from '@/config'

export class DragCommon extends BaseDrag {
  constructor(options: DragOptions) {
    super(options)

    this.addListener()
  }

  static dragStart(options: DragOptions) {
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

    const position = this.getTrackPosition(clientY)

    switch (position.type) {
      case TrackPosition.Over:
        this.#overHandler(position)
        break
      case TrackPosition.Common:
      case TrackPosition.Main:
        this.#trackHandler(position)
        break
      case TrackPosition.Interval:
        break
      case TrackPosition.Audio:
      case TrackPosition.Under:
        break
      default:
        break
    }
  }

  #overHandler(position: TrackPositionData) {
    this.updateAddToNewTrackState({
      top: position.bottom - this.trackContentTop - INTERVAL_TOP_OFFSET,
    })
  }

  #trackHandler(cur: TrackPositionData) {
    this.updateAddToCurrentTrackState({
      top: cur.top,
      height: cur.height,
    })
  }

  protected onDragEnd = () => {
    this.cloneDragTarget.remove()
    this.dragging = false
    this.removeListener()
  }
}
