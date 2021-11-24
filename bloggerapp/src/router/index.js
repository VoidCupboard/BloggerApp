import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from "../views/SignIn.vue"
import SignUp from "../views/SignUp.vue"
import Create from "../views/Create.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'Sign In',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/blogs/create',
    name: 'Create A Blog',
    component: Create
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
