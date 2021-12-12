import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from "../views/SignIn.vue"
import SignUp from "../views/SignUp.vue"
import Create from "../views/Create.vue"
import Blogs from "../views/Blogs.vue"
import Blog from "../views/Blog.vue"
import Edit from "../views/Edit.vue"
import Delete from "../views/Delete.vue"

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
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/delete/:id',
    name: 'Delete',
    component: Delete
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
