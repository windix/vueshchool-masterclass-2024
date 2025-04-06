<script setup lang="ts">
import type { Profile } from '@/lib/supabaseQueries'
import { profileQuery } from '@/lib/supabaseQueries'

// const { profile } = storeToRefs(useAuthStore())

const router = useRoute('/users/[username]')

usePageStore().pageData.title = ''

const profile = ref<Profile | null>(null)

const getProfile = async () => {
  const { data } = await profileQuery({
    column: 'username',
    value: router.params.username,
  })
  profile.value = data
}

await getProfile()
</script>

<template>
  <div
    v-if="profile"
    class="mx-auto mb-10 flex w-full flex-col items-center justify-center py-10 text-center"
  >
    <div class="flex flex-col items-center justify-center pb-4">
      <ProfileAvatar :profile="profile" />
      <p class="mt-2 text-gray-500">@{{ profile.username }}</p>
      <h1 class="mt-5 text-4xl font-bold">{{ profile.first_name }} {{ profile.last_name }}</h1>
      <p class="mt-2 text-sm">{{ profile.bio }}</p>
    </div>
    <!--
    <Button>Edit profile</Button>
    -->
  </div>
</template>
