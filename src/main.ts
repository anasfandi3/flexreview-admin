import { createApp } from 'vue'
import '@/assets/main.css'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import Toast from 'vue-toastification'

const app = createApp(App)
app.use(router)
const pinia = createPinia() 
pinia.use(piniaPersist)
app.use(pinia)
app.use(Toast, {})
app.mount('#app')
