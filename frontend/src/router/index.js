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
          component: () => import('@/views/Home/index.vue'),
        },
        {
          path: 'courses',
          name: 'courses',
          component: () => import('@/views/Courses/index.vue'),
        },
        {
          path: 'courses/:id',
          name: 'CourseDetail',
          component: () => import('@/views/Courses/CourseDetail.vue'),
        },
        {
          path: 'teacher-courses',
          name: 'teacher-courses',
          component: () => import('@/views/Courses/TeacherCourses/index.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/Profile/index.vue'),
        },
      ],
    },
    // Seccion Auth (Login y Register)
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/Auth/Layout/AuthLayout.vue'),
      children: [
        {
          path: '',
          redirect: { name: 'login' },
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/Auth/LoginForm.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/Auth/RegisterForm.vue'),
        },
        {
          path: 'teacher-register',
          name: 'teacher-register',
          component: () => import('@/views/Auth/TeacherRegisterForm.vue'),
        },
      ],
    },
    // TODO: Sección de lecciones
  ],
})

export default router
