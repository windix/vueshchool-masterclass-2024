<script setup lang="ts">
const status = defineModel()

const { readonly = false } = defineProps<{
  readonly?: boolean
}>()

const emit = defineEmits<{
  (e: 'commit'): void
}>()

const toggleStatus = () => {
  if (readonly) {
    return
  }
  status.value = status.value === 'in-progress' ? 'completed' : 'in-progress'
  emit('commit')
}
</script>

<template>
  <button
    :class="{
      'text-2xl': true,
      'cursor-pointer': !readonly,
    }"
    @click="toggleStatus"
  >
    <Transition mode="out-in">
      <iconify-icon
        v-if="status === 'completed'"
        class="text-green-500"
        icon="lucide:circle-check-big"
      ></iconify-icon>
      <iconify-icon v-else class="text-red-500" icon="lucide:circle"></iconify-icon>
    </Transition>
  </button>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 0.1s;
}

.v-enter-from,
.v-leave-to {
  transform: scale(0.3);
}
</style>
