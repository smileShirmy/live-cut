import { TrackComponentName, type Track } from '@/types/track'
import type { CommonTrack } from '../track/common-track'
import type { MainTrack } from '../track/main-track'

export const isAllowCommonItemTrack = (track: Track): track is CommonTrack | MainTrack => {
  return [TrackComponentName.MAIN_TRACK, TrackComponentName.COMMON_TRACK].some(
    (v) => v === track.componentName,
  )
}
