<script setup lang="ts">
type LinkProp = {
  title: string
  to?: string
  icon: string
}

defineProps<{
  links: LinkProp[]
}>()

const { menuOpen } = useMenu()

const emit = defineEmits<{
  actionClicked: [string]
}>()
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      activeClass="text-primary bg-muted"
      class="nav-link"
      :class="{
        'justify-normal': menuOpen,
        'justify-center': !menuOpen,
      }"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span
        class="text-nowrap"
        :class="{
          block: menuOpen,
          hidden: !menuOpen,
        }"
        >{{ link.title }}</span
      >
    </RouterLink>

    <div
      v-else
      class="nav-link cursor-pointer"
      :class="{
        'justify-normal': menuOpen,
        'justify-center': !menuOpen,
      }"
      @click="emit('actionClicked', link.title)"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span
        class="text-nowrap"
        :class="{
          block: menuOpen,
          hidden: !menuOpen,
        }"
        >{{ link.title }}</span
      >
    </div>
  </template>
</template>

<style scoped>
@reference '@/assets/index.css';

.nav-link {
  @apply mx-2 flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:text-primary;
}
</style>
