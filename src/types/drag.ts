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
}

export interface OverTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Over
}

export interface MainTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Main
}

export interface CommonTrackPosition extends BaseTrackPosition {
  type: TrackPosition.Common
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
