import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OwnersView from "../views/OwnersView.vue"
import OwnerDetailView from '@/views/OwnerDetailView.vue'
import LoginView from '@/views/LoginView.vue'
import { checkAuth } from '@/auth/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: "/owners",
      name: "owners",
      component: OwnersView,
      meta: { requiresAuth: true }
    },
    {
      path: '/owners/:id',
      name: 'owner-detail',
      component: OwnerDetailView,
      props: true,
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !checkAuth()) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
