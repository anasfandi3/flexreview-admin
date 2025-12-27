import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/auth/Login.vue'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import Dashboard from '@/pages/dashboard/Dashboard.vue'
import { useAuthStore } from '@/stores/AuthStore'
import Reviews from '@/pages/reviews/Reviews.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'default',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'reviews',
        name: 'reviews',
        component: Reviews,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // If route requires auth and user is not authenticated redirect to login
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' })
  }

  // Otherwise proceed
  next()
})
export default router
