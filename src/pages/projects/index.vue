<script setup lang="ts">
import supabase from '@/lib/supabaseClient'
import { columns } from '@/components/columns/projects'
import type { Tables } from 'database/database.types'

usePageStore().pageData.title = 'Projects'

const projects = ref<Tables<'projects'>[]>([])

const getProjects = async (): Promise<Tables<'projects'>[]> => {
  const { data, error } = await supabase.from('projects').select()

  if (error) {
    console.error(error)
    return []
  } else {
    projects.value = data
    return data
  }
}

await getProjects()
</script>

<template>
  <div class="container mx-auto">
    <DataTable :columns="columns" :data="projects" />
  </div>
</template>
