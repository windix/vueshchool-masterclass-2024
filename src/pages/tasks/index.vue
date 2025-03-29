<script setup lang="ts">
import supabase from '@/lib/supabaseClient'
import { columns } from '@/components/columns/tasks'
import type { Tables } from 'database/database.types'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<Tables<'tasks'>[]>([])

const getTasks = async (): Promise<Tables<'tasks'>[]> => {
  const { data, error } = await supabase.from('tasks').select()

  if (error) {
    console.error(error)
    return []
  } else {
    tasks.value = data
    return data
  }
}

await getTasks()
</script>

<template>
  <div class="container mx-auto">
    <DataTable :columns="columns" :data="tasks" />
  </div>
</template>
