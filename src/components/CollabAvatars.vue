<script setup lang="ts">
const { collabs } = defineProps<{
  collabs: {
    id: string
    username: string | null
    avatar_url: string | null
  }[]
}>()
</script>

<template>
  <Avatar
    class="-mr-4 border border-primary hover:scale-110 transition-transform"
    v-for="collab in collabs"
    :key="collab.id"
  >
    <template v-if="collab.username && collab.avatar_url">
      <RouterLink
        class="w-full h-full flex items-center justify-center"
        :to="{
          name: '/users/[username]',
          params: { username: collab.username },
        }"
      >
        <AvatarImage :src="collab.avatar_url" :alt="collab.username" />
        <AvatarFallback>{{ collab.username }}</AvatarFallback>
      </RouterLink>
    </template>
  </Avatar>
</template>
