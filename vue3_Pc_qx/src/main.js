
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';


import http from '../src/utils/req'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.$http = http
app.use(Antd).mount('#app');


