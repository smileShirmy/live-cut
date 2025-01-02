import type { App } from 'vue'
import CommonTrack from './CommonTrack.vue'
import MainTrack from './MainTrack.vue'
import AudioTrack from './AudioTrack.vue'
import { TrackComponentName } from '@/types/track'

const trackComponent = {
  install(app: App) {
    app.component(TrackComponentName.AUDIO_TRACK, CommonTrack)
    app.component(TrackComponentName.MAIN_TRACK, MainTrack)
    app.component(TrackComponentName.AUDIO_TRACK, AudioTrack)
  },
}

export default trackComponent
