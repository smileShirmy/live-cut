import type { App } from 'vue'
import { TrackItemComponentName } from '@/types/track-item'
import VideoTrackItem from './VideoTrackItem.vue'
import AudioTrackItem from './AudioTrackItem.vue'

const trackComponent = {
  install(app: App) {
    app.component(TrackItemComponentName.VIDEO_TRACK_ITEM, VideoTrackItem)
    app.component(TrackItemComponentName.AUDIO_TRACK_ITEM, AudioTrackItem)
  },
}

export default trackComponent
