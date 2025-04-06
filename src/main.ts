import './assets/index.css'
import 'iconify-icon'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import formKitConfig from '../formkit.config'
import { createMetaManager } from 'vue-meta'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createMetaManager())
app.use(plugin, defaultConfig(formKitConfig))

app.mount('#app')
