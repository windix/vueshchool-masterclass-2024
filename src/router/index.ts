import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { h } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // {
    //   path: '/projects',
    //   name: 'projects',
    //   component: () => import('@/views/ProjectsView.vue'),
    // },
    {
      path: '/projects/:id',
      name: 'project',
      component: () => import('@/views/DynamicProjectView.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      name: 'not-found',
      component: h('p', { style: { color: 'red' } }, '404 Not Found'),
    },
  ],
})

export default router
