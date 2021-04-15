import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BookingFlight from '../views/BookingFlight.vue'
import Test from '../views/Test.vue'

const routes = [
  {
    path:'/',
    name : 'Test',
    component:Test
  },
  {
    path: '/booking-flight',
    name: 'BookingFlight',
    component: BookingFlight
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
