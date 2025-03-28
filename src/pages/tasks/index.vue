<script setup lang="ts">
import supabase from '@/lib/supabaseClient'
import type { Tables } from '../../../database/database.types'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<Tables<'tasks'>[]>([])

const getTasks = async (): Promise<Tables<'tasks'>[]> => {
  const { data, error } = await supabase.from('tasks').select().limit(5)

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
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <!-- <RouterLink
          :to="{
            name: '/tasks/[id]',
            params: { id: task.id },
          }"
          >{{ task.name }}</RouterLink
        > -->
        {{ task.name }}
        {{ task.status }}
        {{ task.project_id }}
        {{ task.created_at }}
      </li>
    </ul>
  </div>
</template>
