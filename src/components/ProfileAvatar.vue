<script setup lang="ts">
import { fallbackInitials } from '@/lib/profileHelpers'

const { profile } = defineProps<{
  profile: {
    id: string
    username: string | null
    first_name: string | null
    last_name: string | null
    avatar_url: string | null
  } | null
}>()
</script>

<template>
  <Avatar v-if="profile" size="lg">
    <AvatarImage :src="profile.avatar_url || ''" alt="@{{ profile.username }}" />
    <AvatarFallback>{{ fallbackInitials(profile) }}</AvatarFallback>
  </Avatar>
</template>

<style scoped></style>
