<script setup lang="ts">
const { profile } = storeToRefs(useAuthStore())
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
    <DropdownMenu>
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
  </nav>
</template>
