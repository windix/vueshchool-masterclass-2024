import { retrieveSession } from '@/lib/supabaseAuth'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  // usePageStore().pageData.title = ''

  const authStore = useAuthStore()

  // wait for pinia store updates before navigating
  await retrieveSession()

  if (!authStore.user && to.name !== '/auth/login' && to.name !== '/auth/register') {
    return { name: '/auth/login' }
  }
})

router.afterEach(() => {
  useErrorStore().clearError()
})

export default router
