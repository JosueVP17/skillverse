import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:  () => import('../views/Home/index.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component:  () => import('../views/Auth/Layout/Layout.vue'),
      children: [
        {
          path: '',
          redirect: { name: 'login' }
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/Auth/Login/index.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/Auth/Register/index.vue')
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
