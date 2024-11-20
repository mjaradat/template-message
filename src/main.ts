import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './custom-style.css'
import router from './router'

import App from './App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
