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
          path: 'cart',
          name: 'cart',
          component: () => import('@/views/Payment/ShoppingCart.vue'),
        },
        {
          path: 'pago-exitoso',
          name: 'payment-success',
          component: () => import('@/views/Payment/PaymentSuccess.vue'),
        },
        {
          path: 'carrito',
          name: 'carrito',
          component: () => import('@/views/Payment/ShoppingCart.vue'),
        },
        {
          path: 'pago-cancelado',
          name: 'payment-cancelled',
          component: () => import('@/views/Payment/PaymentCancelled.vue'),
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
    // Sección de lecciones
    {
      path: '/courses/:id/lessons',
      name: 'lectures',
      component: () => import('@/views/Auth/LectureLayout.vue'),
      children: [
        {
          path: '',
          name: 'LecturePage',
          component: () => import('@/views/Lectures/index.vue'),
        },
      ],
    },
  ],
})

export default router
