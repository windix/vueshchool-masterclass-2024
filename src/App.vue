<script setup lang="ts">
const { error } = storeToRefs(useErrorStore())

onErrorCaptured((error) => {
  useErrorStore().setError({ error, customCode: 500 })
  return false
})

onMounted(() => {
  useAuthStore().subscribeToAuthEvents()
})

const { user } = storeToRefs(useAuthStore())

const AuthLayout = defineAsyncComponent(() => import('@/components/layout/main/AuthLayout.vue'))
const GuestLayout = defineAsyncComponent(() => import('@/components/layout/main/GuestLayout.vue'))
</script>

<template>
  <Transition name="fade" mode="out-in">
    <Component :is="user ? AuthLayout : GuestLayout" :key="user?.id">
      <AppErrorPage v-if="error" />
      <RouterView v-else v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <div class="w-full" :key="route.path">
            <Suspense v-if="Component" :timeout="0">
              <!-- main content -->
              <Component :is="Component"></Component>
              <!-- loading state -->
              <template #fallback>
                <div
                  class="bg-opacity-90 absolute top-1/2 left-1/2 z-50 flex h-screen w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center bg-background"
                >
                  <iconify-icon icon="lucide:loader-circle" class="animate-spin text-6xl" />
                </div>
              </template>
            </Suspense>
          </div>
        </Transition>
      </RouterView>
    </Component>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
