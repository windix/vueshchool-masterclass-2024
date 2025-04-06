<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const { profile } = storeToRefs(useAuthStore())

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <nav class="flex h-16 items-center justify-between gap-2 border-b bg-muted/40 px-6">
    <form class="relative h-fit w-full max-w-96">
      <iconify-icon
        class="absolute top-[50%] left-2.5 translate-y-[-50%] text-muted-foreground"
        icon="lucide:search"
      ></iconify-icon>
      <Input class="w-full bg-background pl-8" type="text" placeholder="Search ..." />
    </form>

    <div class="flex h-fit w-full items-end-safe justify-end gap-2">
      <Button @click="toggleDark()" class="size-8 p-2">
        <Transition name="scale" mode="out-in">
          <iconify-icon v-if="isDark" icon="lucide:sun"></iconify-icon>
          <iconify-icon v-else icon="lucide:moon"></iconify-icon>
        </Transition>
      </Button>
    </div>

    <div class="w-8">
      <DropdownMenu v-if="profile">
        <DropdownMenuTrigger>
          <ProfileAvatar :profile="profile" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>
