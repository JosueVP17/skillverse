import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/main/home.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/Auth/Layout/Layout.vue'),
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
  ],
})

export default router
