<script setup lang="ts">
import supabase from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/database.types'

const projects = ref<Tables<'projects'>[]>([])

const getProjects = async (): Promise<Tables<'projects'>[]> => {
  const { data: projects, error } = await supabase.from('projects').select().limit(5)

  if (error) {
    console.error(error)
    return []
  } else {
    return projects
  }
}

;(async () => {
  projects.value = await getProjects()
})()
</script>

<template>
  <div>
    <h1>Projects</h1>

    <ul>
      <li v-for="project in projects" :key="project.id">
        <RouterLink
          :to="{
            name: '/projects/[slug]',
            params: { slug: project.slug },
          }"
          >{{ project.name }}</RouterLink
        >
        {{ project.created_at }}
      </li>
    </ul>

    <RouterLink to="/">Home</RouterLink>
  </div>
</template>
