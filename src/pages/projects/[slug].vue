<script setup lang="ts">
import { projectBySlugQuery } from '@/lib/supabaseQueries'
import type { ProjectWithTasks } from '@/lib/supabaseQueries'

const route = useRoute('/projects/[slug]')

const project = ref<ProjectWithTasks | null>(null)

watch(
  () => project.value?.name,
  (newValue) => {
    usePageStore().pageData.title = `Project: ${newValue || ''}`
  },
  { immediate: true },
)

const getProject = async (slug: string): Promise<ProjectWithTasks | null> => {
  const { data, error } = await projectBySlugQuery(slug)

  if (error) {
    console.error(error)
    return null
  } else {
    project.value = data
    // usePageStore().pageData.title = data.name
    return data
  }
}

project.value = await getProject(route.params.slug)
</script>

<template>
  <div v-if="project">
    <Table>
      <TableRow>
        <TableHead> Name </TableHead>
        <TableCell>{{ project.name }}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Description </TableHead>
        <TableCell>{{ project.description }}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Status </TableHead>
        <TableCell>{{ project.status }}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Collaborators </TableHead>
        <TableCell>
          <div class="flex">
            <Avatar
              class="-mr-4 border border-primary hover:scale-110 transition-transform"
              v-for="collb in project.collaborators"
              :key="collb"
            >
              <RouterLink class="w-full h-full flex items-center justify-center" to="">
                <AvatarImage src="" alt="" />
                <AvatarFallback>{{ collb }}</AvatarFallback>
              </RouterLink>
            </Avatar>
          </div>
        </TableCell>
      </TableRow>
    </Table>

    <section class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow">
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
          <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
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
  @apply mb-4 text-lg font-semibold w-fit;
}

.table-container {
  @apply overflow-hidden overflow-y-auto rounded-md h-80;
}
</style>
