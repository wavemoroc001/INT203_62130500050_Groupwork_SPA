import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BookingFlight from '../views/BookingFlight.vue'
import BookingInfo from '../views/BookingInfo.vue'
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
    path : '/booking-info/:flightID',
    name : 'BookingInfo',
    component : BookingInfo
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
