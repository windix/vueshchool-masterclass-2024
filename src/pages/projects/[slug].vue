<script setup lang="ts">
import AppInPlaceEditProjectStatus from '@/components/app-in-place-edit/AppInPlaceEditProjectStatus.vue'
import { updateProjectQuery } from '@/lib/supabaseQueries'

const route = useRoute('/projects/[slug]')

const projectLoader = useProjectsStore()
const { collabs, project } = storeToRefs(projectLoader)
const { getProjectBySlug } = projectLoader

watch(
  () => project.value?.name,
  (newValue) => {
    usePageStore().pageData.title = `Project: ${newValue || ''}`
  },
  // { immediate: true },
)

project.value = await getProjectBySlug(route.params.slug)

const updateProject = async () => {
  if (!project.value) {
    return
  }

  const { id, tasks, ...dataToUpdate } = project.value

  const { error } = await updateProjectQuery(project.value.id, dataToUpdate)

  if (error) {
    console.error('Error updating project:', error)
    return
  }
}
</script>

<template>
  <div v-if="project">
    <Table>
      <TableRow>
        <TableHead> Name </TableHead>
        <TableCell>
          <AppInPlaceEditInput v-model="project.name" @commit="updateProject" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Description </TableHead>
        <TableCell>
          <AppInPlaceEditInput v-model="project.description" @commit="updateProject" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Status </TableHead>
        <TableCell>
          <AppInPlaceEditProjectStatus v-model="project.status" @commit="updateProject" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Collaborators </TableHead>
        <TableCell>
          <div class="flex">
            <CollabAvatars :collabs="collabs" />
          </div>
        </TableCell>
      </TableRow>
    </Table>

    <section class="mt-10 flex grow flex-col justify-between gap-5 md:flex-row">
      <div class="flex-1">
        <h2>Tasks</h2>
        <div class="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead> Name </TableHead>
                <TableHead> Status </TableHead>
                <TableHead> Due Date </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="task in project.tasks" :key="task.id">
                <TableCell>{{ task.name }}</TableCell>
                <TableCell>{{ task.status }}</TableCell>
                <TableCell>{{ task.due_date }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div class="flex-1">
        <h2>Documents</h2>
        <div class="table-container">
          <p class="px-4 py-3 text-sm font-semibold text-muted-foreground">
            This project doesn't have documents yet...
          </p>
          <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@reference '@/assets/index.css';

th {
  @apply w-[100px];
}

h2 {
  @apply mb-4 w-fit text-lg font-semibold;
}

.table-container {
  @apply h-80 overflow-hidden overflow-y-auto rounded-md;
}
</style>
