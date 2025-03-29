<script setup lang="ts">
import { columns } from '@/components/columns/projects'
import { projectsQuery } from '@/lib/supabaseQueries'
import type { Projects } from '@/lib/supabaseQueries'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects>([])

const getProjects = async (): Promise<Projects> => {
  const { data, error } = await projectsQuery

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
