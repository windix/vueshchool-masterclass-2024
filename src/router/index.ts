import { retrieveSession } from '@/lib/supabaseAuth'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  // usePageStore().pageData.title = ''

  const { user } = storeToRefs(useAuthStore())

  // wait for pinia store updates before navigating
  await retrieveSession()

  const isAuthPage = ['/auth/login', '/auth/register'].includes(to.path)

  if (!user.value && !isAuthPage) {
    return { name: '/auth/login' }
  }

  if (user.value && isAuthPage) {
    return { name: '/' }
  }
})

router.afterEach(() => {
  useErrorStore().clearError()
})

export default router
