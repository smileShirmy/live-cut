import type { Track } from '@/types/track'
import { shallowReactive } from 'vue'
import { MainTrack } from '../track/main-track'

class TrackManage {
  private readonly _trackList = shallowReactive<Track[]>([MainTrack.create()])

  get trackList() {
    return this._trackList
  }
}

const trackManage = new TrackManage()

export { trackManage }
