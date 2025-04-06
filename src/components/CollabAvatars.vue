<script setup lang="ts">
import { fallbackInitials } from '@/lib/profileHelpers'

const { collabs } = defineProps<{
  collabs: {
    id: string
    username: string | null
    first_name: string | null
    last_name: string | null
    avatar_url: string | null
  }[]
}>()
</script>

<template>
  <Avatar
    class="-mr-4 border border-primary transition-transform hover:scale-110"
    v-for="collab in collabs"
    :key="collab.id"
  >
    <template v-if="collab.username">
      <RouterLink
        class="flex h-full w-full items-center justify-center"
        :to="{
          name: '/users/[username]',
          params: { username: collab.username },
        }"
      >
        <AvatarImage :src="collab.avatar_url || ''" :alt="collab.username" />
        <AvatarFallback>{{ fallbackInitials(collab) }}</AvatarFallback>
      </RouterLink>
    </template>
  </Avatar>
</template>
