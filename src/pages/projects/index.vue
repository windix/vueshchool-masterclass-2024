<script setup lang="ts">
import { columns } from '@/lib/columns/projects'
import { useCollabs } from '@/composables/collabs'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()

const { groupedCollabs, getGroupedCollabs } = useCollabs()

await getGroupedCollabs(projects.value)
</script>

<template>
  <div class="container mx-auto">
    <DataTable :columns="columns(groupedCollabs)" :data="projects" />
  </div>
</template>
