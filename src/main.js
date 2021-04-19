import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import Navbar from './components/Navbar.vue'
import BaseButton from './components/UiCompo/BaseButton.vue'
import BaseCard  from './components/UiCompo/BaseCard.vue'

const vue = createApp(App);
vue.component('nav-bar',Navbar);
vue.component('base-button',BaseButton);
vue.component('base-card',BaseCard);
vue.use(router);
vue.mount('#app');
//createApp(App).use(router).mount('#app')
