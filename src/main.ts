import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import '@/styles/main.scss'
import router from '@/router/index'
import 'lib-flexible'
import SvgIcon from '@/components/SvgIcon/index.vue'
import '@/mock/index'

const app = createApp(App)

app.use(createPinia()).use(router)
app.component('SvgIcon', SvgIcon).mount('#app')
