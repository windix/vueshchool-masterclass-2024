<script setup lang="ts">
import { columns } from '@/components/columns/tasks'
import { tasksWithProjectsQuery } from '@/lib/supabaseQueries'
import type { TasksWithProjects } from '@/lib/supabaseQueries'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<TasksWithProjects>([])

const getTasks = async (): Promise<TasksWithProjects> => {
  const { data, error } = await tasksWithProjectsQuery

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
