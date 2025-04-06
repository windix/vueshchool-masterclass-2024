<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { signOut } from '@/lib/supabaseAuth'

const router = useRouter()

const { menuOpen, toggleMenu } = useMenu()
const { width: windowWidth } = useWindowSize()

watchEffect(() => {
  if (windowWidth.value > 1024) {
    menuOpen.value = true
  } else {
    menuOpen.value = false
  }
})

const topLinks = [
  { title: 'Dashboard', to: '/', icon: 'lucide:house' },
  { title: 'Projects', to: '/projects', icon: 'lucide:building-2' },
  { title: 'My Tasks', to: '/tasks', icon: 'lucide:badge-check' },
]

const bottomLinks = [
  { title: 'Profile', to: '/profile', icon: 'lucide:user' },
  { title: 'Settings', to: '/settings', icon: 'lucide:settings' },
  { title: 'Sign out', icon: 'lucide:log-out' },
]

const executeAction = async (title: string) => {
  if (title === 'Sign out') {
    if (await signOut()) {
      router.push('/auth/login')
    }
  }
}
</script>

<template>
  <aside
    class="fixed flex h-screen flex-col gap-2 border-r bg-muted/40 transition-[width]"
    :class="{
      'w-24': !menuOpen,
      'w-52': menuOpen,
    }"
  >
    <div class="flex h-16 shrink-0 items-center justify-between gap-1 border-b px-2 lg:px-4">
      <Button variant="outline" size="icon" class="size-8" @click="toggleMenu">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" class="size-8">
            <iconify-icon icon="lucide:plus"></iconify-icon>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="$emit('newProjectClicked')">New Project</DropdownMenuItem>
          <DropdownMenuItem @click="$emit('newTaskClicked')">New Task</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <nav class="relative flex h-full flex-col justify-between gap-2">
      <div>
        <SidebarLinks :links="topLinks" />
      </div>

      <div class="border-y bg-background py-3 text-center">
        <SidebarLinks :links="bottomLinks" @actionClicked="executeAction" />
      </div>
    </nav>
  </aside>
</template>
