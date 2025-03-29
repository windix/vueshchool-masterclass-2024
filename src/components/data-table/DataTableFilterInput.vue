<script setup lang="ts" , generic="TData">
import type { Table } from '@tanstack/vue-table'

const props = defineProps<{
  table: Table<TData>
  columnName: string
  placeholder?: string
}>()
</script>

<template>
  <Input
    class="max-w-sm"
    :placeholder="props.placeholder || `Filter by ${props.columnName}...`"
    :model-value="table.getColumn(props.columnName)?.getFilterValue() as string"
    @update:model-value="table.getColumn(props.columnName)?.setFilterValue($event)"
  />
</template>
