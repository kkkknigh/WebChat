import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/styles.css'

createApp(App).use(router).mount('#app')