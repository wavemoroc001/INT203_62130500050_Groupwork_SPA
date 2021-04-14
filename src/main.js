import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import Navbar from './components/Navbar.vue'

const vue = createApp(App);
vue.component('nav-bar',Navbar);
vue.use(router);
vue.mount('#app');
//createApp(App).use(router).mount('#app')
