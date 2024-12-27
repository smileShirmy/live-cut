export enum TrackPosition {
  Over,
  Main,
  Common,
  Audio,
  Interval,
  Under,
}

export interface BaseTrackPosition {
  top: number
  height: number
  bottom: number
}

export interface OverTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Over
}

export interface CommonTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Common
}

export interface MainTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Main
}

export interface AudioTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Audio
}

export interface IntervalTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Interval
}

export interface UnderTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Under
}

export type TrackPositionData =
  | MainTrackPosition
  | CommonTrackPosition
  | AudioTrackPosition
  | OverTrackPosition
  | IntervalTrackPosition
  | UnderTrackPosition

export interface DropArea {
  top: number
  left: number
}

export interface BaseDragOptions {
  startPointerEvent: PointerEvent
  dragTarget: HTMLElement
}

export interface DragOptions<T> extends BaseDragOptions {
  dragResource: T
}

export enum DragStateType {
  ADD_TO_NEW_TRACK,
  ADD_TO_CURRENT_TRACK,
}

export interface AddToNewTrackDragState {
  type: DragStateType.ADD_TO_NEW_TRACK
  top: number
}

export interface AddToCurrentTrackDragState {
  type: DragStateType.ADD_TO_CURRENT_TRACK
  top: number
  left: number
  width: number
  height: number
}

export type DragState = AddToNewTrackDragState | AddToCurrentTrackDragState
