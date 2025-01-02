import './assets/scss/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import baseComponent from './components/base'
import trackComponent from './components/container/track/components/track-controller/components/track'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(baseComponent)
app.use(trackComponent)

app.mount('#app')
