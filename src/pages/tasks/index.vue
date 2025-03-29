<script setup lang="ts">
import supabase from '@/lib/supabaseClient'
import { columns } from '@/components/columns/tasks'
import type { QueryData } from '@supabase/supabase-js'

usePageStore().pageData.title = 'My Tasks'

const tasksWithProjectsQuery = supabase.from('tasks').select(`
  *,
  projects (
    id, name, slug
  )
`)

export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

const tasks = ref<TasksWithProjects>([])

const getTasks = async (): Promise<TasksWithProjects> => {
  const { data, error } = await tasksWithProjectsQuery

  console.log(data)

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
