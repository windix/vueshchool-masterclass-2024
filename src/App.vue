<script setup lang="ts">
import 'iconify-icon'

onMounted(() => {
  useAuthStore().subscribeToAuthEvents()
})

const { user } = storeToRefs(useAuthStore())

const AuthLayout = defineAsyncComponent(() => import('@/components/layout/main/AuthLayout.vue'))
const GuestLayout = defineAsyncComponent(() => import('@/components/layout/main/GuestLayout.vue'))
</script>

<template>
  <Component :is="user ? AuthLayout : GuestLayout">
    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <!-- main content -->
        <Component :is="Component" :key="route.name"></Component>
        <!-- loading state -->
        <template #fallback>
          <span>Loading...</span>
        </template>
      </Suspense>
    </RouterView>
  </Component>
</template>
