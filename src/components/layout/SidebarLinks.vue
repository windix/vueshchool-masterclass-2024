<script setup lang="ts">
type LinkProp = {
  title: string
  to?: string
  icon: string
}

defineProps<{
  links: LinkProp[]
}>()

const emit = defineEmits<{
  actionClicked: [string]
}>()
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink v-if="link.to" :to="link.to" activeClass="text-primary bg-muted" class="nav-link">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>

    <div v-else class="nav-link cursor-pointer" @click="emit('actionClicked', link.title)">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </div>
  </template>
</template>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary
  justify-center lg:justify-normal text-muted-foreground;
}
</style>
