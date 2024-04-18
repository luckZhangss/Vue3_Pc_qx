import { createRouter, createWebHistory } from 'vue-router'
// import IndexView from '../views/Admin/IndexView.vue'
import IndexView from '../views/Admin/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 普通路由
    {
      path: '/register',
      name: 'register',
      component:()=>import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component:()=>import('../views/LoginView.vue')
    },
    {
      path:'/',
      name:'/home',
      component: IndexView,
    },
  
    {
      path:'/admin',
      // redirect:'/admin/index',
      component:()=>import('../views/Admin/IndexView.vue'),
      children:[
        {
          path:'index',
          component:()=>import('../views/Admin/IndexView.vue')
        },
        {
          path:'chart',
          component:()=>import('../views/Admin/ChartView.vue')
        },
        {
          path:'members',
          component:()=>import('../views/Admin/MembersView.vue')
        },
        {
          path:'permission',
          component:()=>import('../views/Admin/PermissionView.vue')
        }
       
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component:()=>import('../views/NotFoundView.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
   
   
    
  ]
})

export default router
