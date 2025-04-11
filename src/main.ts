import './assets/index.css'
import 'iconify-icon'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import formKitConfig from '../formkit.config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig(formKitConfig))

// app.config.errorHandler = (err, instance, info) => {
//   //...
// }

app.mount('#app')
