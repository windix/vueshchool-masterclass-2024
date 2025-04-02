<script setup lang="ts">
import { columns } from '@/lib/columns/projects'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()
</script>

<template>
  <div class="container mx-auto">
    <DataTable :columns="columns" :data="projects" />
  </div>
</template>
