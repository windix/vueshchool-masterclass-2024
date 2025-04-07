<script setup lang="ts">
useErrorStore().setError({
  error: new Error('Page not found'),
  customCode: 404,
})
</script>

<template>
  <div></div>
</template>
