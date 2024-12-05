import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import "@/styles/default.css"
import * as Icons from "@element-plus/icons-vue";

const app = createApp(App);

Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons]);
  });
  
app
    .use(router)
    .mount('#app')
