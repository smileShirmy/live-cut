import type { App } from 'vue'
import AppPane from './app-pane/AppPane.vue'
import AppPaneDivider from './app-pane/AppPaneDivider.vue'
import AppPopper from './app-popper/AppPopper.vue'

const baseComponent = {
  install(app: App) {
    app.component('AppPane', AppPane)
    app.component('AppPaneDivider', AppPaneDivider)
    app.component('AppPopper', AppPopper)
  },
}

export default baseComponent
