import type { DragOptions, DropArea, TrackPositionData } from '@/types/drag'
import mitt from 'mitt'
import { emitter, Events } from '../mitt/emitter'
import { cloneElement } from '../helpers/dom'
import { useDragStore } from '@/stores/drag'

export abstract class BaseDrag {
  protected readonly emitter = mitt<{
    update: undefined
  }>()
  readonly on = this.emitter.on

  protected readonly startPointerEvent: PointerEvent
  protected readonly dragTarget: HTMLElement
  protected readonly cloneDragTarget: HTMLElement

  protected readonly dragStore = useDragStore()
  protected trackPositions: TrackPositionData[] = []
  protected dropArea: DropArea = { top: 0, left: 0 }
  protected dragging = true

  constructor(options: DragOptions) {
    this.startPointerEvent = options.startPointerEvent
    this.dragTarget = options.dragTarget
    this.cloneDragTarget = cloneElement(options.dragTarget)
    this.#appendCloneToBody()

    emitter.emit(Events.INIT_TRACK_POSITIONS, (data: TrackPositionData[]) => {
      this.trackPositions = data
    })
    emitter.emit(Events.INIT_DROP_AREA, (data: DropArea) => {
      this.dropArea = data
    })
  }

  protected abstract addListener(): void

  protected abstract removeListener(): void

  protected abstract onDragging: (e: PointerEvent) => void

  protected abstract onDragEnd: (e: PointerEvent) => void

  #appendCloneToBody() {
    document.body.appendChild(this.cloneDragTarget)
  }

  protected updateCloneStyle(x: number, y: number) {
    this.cloneDragTarget.style.position = 'fixed'
    this.cloneDragTarget.style.pointerEvents = 'none'
    this.cloneDragTarget.style.top = `${y}px`
    this.cloneDragTarget.style.left = `${x}px`
    this.cloneDragTarget.style.opacity = '0.7'
  }

  /**
   * 获取当前所处轨道在 y 轴上的位置信息
   */
  protected getTrackPositionData(y: number) {
    let target: TrackPositionData | null = null
    const len = this.trackPositions.length
    for (let i = 0; i < len; i += 1) {
      const cur = this.trackPositions[i]
      const next = this.trackPositions[i + 1]
      if (y >= cur.top) {
        if (!next || y < next.top) {
          target = cur
          break
        }
      }
    }
    return target
  }
}
