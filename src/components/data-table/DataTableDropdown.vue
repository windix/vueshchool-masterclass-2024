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
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(entry.id)">Copy ID</DropdownMenuItem>
      <DropdownMenuItem @click="$emit('expand')">Expand</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
