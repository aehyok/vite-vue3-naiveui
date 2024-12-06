import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import "@/styles/default.css"
import * as Icons from "@element-plus/icons-vue";
import { createPinia } from 'pinia'

const app = createApp(App);
const pinia = createPinia()

Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons]);
  });
  
app
    .use(router)
    .use(pinia)
    .mount('#app')
