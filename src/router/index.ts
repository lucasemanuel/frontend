import { createRouter, createWebHistory } from 'vue-router'

import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/travel/:id',
      name: 'travel-request',
      component: () => import('../views/ShowTravelRequest.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    }
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' && localStorage.getItem('isLogged')) {
    next({ name: 'dashboard' })
  } else if (to.meta.requiresAuth && !localStorage.getItem('isLogged')) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
