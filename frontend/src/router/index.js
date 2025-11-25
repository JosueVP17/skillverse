import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Plantilla con Navbar y Footer (TODAS LAS PÁGINAS MENOS AUTH, Y LA SECCIÓN DE LECCIONES)
    {
      path: '/',
      name: 'app-layout',
      component: () => import('@/layouts/Layout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: 'courses',
          name: 'courses',
          component: () => import('@/views/Courses/index.vue')
        }
      ]
    },
    // Seccion Auth (Login y Register)
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/Auth/Layout/Layout.vue'),
      children: [
        {
          path: '',
          redirect: { name: 'login' }
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/Auth/Login/index.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/Auth/Register/index.vue')
        }
      ]
    }
    // TODO: Sección de lecciones
  ],
})

export default router
