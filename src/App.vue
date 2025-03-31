<script setup lang="ts">
import 'iconify-icon'

onMounted(() => {
  useAuthStore().subscribeToAuthEvents()
})
</script>

<template>
  <AuthLayout>
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
  </AuthLayout>
</template>
