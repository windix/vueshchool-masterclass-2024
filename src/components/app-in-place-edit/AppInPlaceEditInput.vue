<script setup lang="ts">
const value = defineModel()

const emit = defineEmits<{
  (e: 'commit'): void
}>()
</script>

<template>
  <input
    class="w-full bg-transparent p-1 focus:border-none focus:ring-2 focus:ring-blue-500 focus:outline-none dark:focus:ring-blue-300"
    type="text"
    v-model="value"
    @blur="emit('commit')"
    @keyup.enter="($event.target as HTMLInputElement).blur()"
  />
</template>
