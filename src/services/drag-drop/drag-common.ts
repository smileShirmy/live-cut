import { TrackPosition, type DragOptions } from '@/types/drag'
import { BaseDrag } from './base-drag'

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

    this.updateAddToNewTrackState({
      top: position.top,
    })

    switch (position.type) {
      case TrackPosition.Over:
        break
      default:
        break
    }
  }

  protected onDragEnd = () => {
    this.cloneDragTarget.remove()
    this.dragging = false
    this.removeListener()
  }
}
