import { createRouter, createWebHistory } from 'vue-router'
// import IndexView from '../views/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: IndexView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
     {
      path: '/home',
      name: 'home',
      component: () => import('../views/IndexView.vue')
    },
    {
      path: '/',
      name: 'register',
      component:()=>import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component:()=>import('../views/LoginView.vue')
    },
  ]
})

export default router
