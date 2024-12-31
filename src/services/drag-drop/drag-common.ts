import {
  DragStateType,
  TrackPosition,
  type AddToCurrentTrackDragState,
  type AddToNewTrackDragState,
  type CommonTrackPosition,
  type DragOptions,
  type IntervalTrackPosition,
  type MainTrackPosition,
  type OverTrackPosition,
} from '@/types/drag'
import { BaseDrag } from './base-drag'
import { INTERVAL_TOP_OFFSET } from '@/config'
import { warn } from 'vue'
import type { VideoTrackItem } from '../track-item/video-track-item'

export class DragCommon extends BaseDrag {
  #trackItem: VideoTrackItem

  constructor(options: DragOptions<VideoTrackItem>) {
    super(options)
    this.#trackItem = options.trackItem
    this.addListener()
  }

  static dragStart(...args: ConstructorParameters<typeof DragCommon>) {
    return new DragCommon(...args)
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

  #overHandler(position: OverTrackPosition) {
    this.updateAddToNewTrackState({
      top: this.inContentTop(position.bottom) - INTERVAL_TOP_OFFSET,
      insertIndex: 0,
    })
  }

  #trackHandler(position: MainTrackPosition | CommonTrackPosition, clientX: number) {
    this.updateAddToCurrentTrackState({
      top: this.inContentTop(position.top),
      left: this.inContentLeft(clientX),
      width: this.trackStore.durationToWidth(this.#trackItem.duration),
      height: position.height,
      trackIndex: position.index,
    })
  }

  #intervalHandler(position: IntervalTrackPosition, main: MainTrackPosition) {
    if (position.top < main.bottom) {
      this.updateAddToNewTrackState({
        top: this.inContentTop(main.bottom) + INTERVAL_TOP_OFFSET,
        insertIndex: position.insertIndex,
      })
    } else {
      this.updateAddToNewTrackState({
        top: this.inContentTop(position.top) + INTERVAL_TOP_OFFSET,
        insertIndex: position.insertIndex,
      })
    }
  }

  #underHandler(main: MainTrackPosition) {
    this.updateAddToNewTrackState({
      top: this.inContentTop(main.bottom) + INTERVAL_TOP_OFFSET,
      insertIndex: main.index + 1,
    })
  }

  protected onDragEnd = () => {
    if (this.dragStore.dragState) {
      switch (this.dragStore.dragState.type) {
        case DragStateType.ADD_TO_CURRENT_TRACK:
          this.#addToCurrentTrack(this.dragStore.dragState)
          break
        case DragStateType.ADD_TO_NEW_TRACK:
          this.#addToNewTrack(this.dragStore.dragState)
          break
        default:
          break
      }
    }

    this.cloneDragTarget.remove()
    this.dragging = false
    this.removeListener()
  }

  #addToCurrentTrack(dragState: AddToCurrentTrackDragState) {
    this.trackStore.trackList[dragState.trackIndex].addItem(this.#trackItem)
  }

  #addToNewTrack(dragState: AddToNewTrackDragState) {
    //
  }
}
