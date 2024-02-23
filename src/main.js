import { createApp } from 'vue'
import App from './App.vue'
import Router from './routes/Router.js'
import "../src/pluguins/Fontawesome/IconsPluguin.js"
import './index.css'

createApp(App).use(Router).mount('#app')
