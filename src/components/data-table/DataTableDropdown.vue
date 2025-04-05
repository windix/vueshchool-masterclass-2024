<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'

defineProps<{
  entry: {
    id: string
  }
}>()

defineEmits<{
  (e: 'expand'): void
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="h-8 w-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(entry.id)">Copy ID</DropdownMenuItem>
      <DropdownMenuItem @click="$emit('expand')">Expand</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
