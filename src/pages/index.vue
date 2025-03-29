<script setup lang="ts">
import { columns } from '@/components/payments/columns'
import { payments } from '@/lib/payments'

usePageStore().pageData.title = 'Dashboard'
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="payments" />
  </div>
</template>
