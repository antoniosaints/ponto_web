import { createApp } from 'vue'
import App from './App.vue'
import Router from './routes/Router.js'
import './index.css'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faGears, faFileLines, faClock, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faGears, faFileLines, faClock, faLocationCrosshairs);

createApp(App).use(Router).mount('#app')
