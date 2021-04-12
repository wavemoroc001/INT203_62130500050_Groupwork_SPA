import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Playlist from '../components/Playlist.vue'

const routes = [
  {
    path: '/',
    name: 'playlist',
    component: Playlist
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
