<script setup lang="ts">
const inputValue = defineModel<string>()

const oldInputValue = ref(inputValue.value)

const emit = defineEmits<{
  (e: 'commit'): void
}>()

watch(inputValue, (_, oldValue) => {
  oldInputValue.value = oldValue
})

const emitCommit = () => {
  if (inputValue.value !== oldInputValue.value) {
    emit('commit')
  }
}
</script>

<template>
  <textarea
    rows="5"
    class="w-full bg-transparent p-1 focus:border-none focus:ring-2 focus:ring-blue-500 focus:outline-none dark:focus:ring-blue-300"
    type="text"
    v-model="inputValue"
    @blur="emitCommit"
  />
</template>
