<script setup lang="ts">
import supabase from '@/lib/supabaseClient'
import type { Tables } from '../../../database/database.types'

const route = useRoute()

const loading = ref(true)

const project = ref<Tables<'projects'> | null>(null)

const getProject = async (slug: string): Promise<Tables<'projects'> | null> => {
  const { data: project, error } = await supabase
    .from('projects')
    .select()
    .eq('slug', slug)
    .single()

  if (error) {
    console.error(error)
    return null
  } else {
    return project
  }
}

;(async () => {
  if (route.name === '/projects/[slug]') {
    const slug = route.params.slug
    project.value = await getProject(slug)
    loading.value = false
  }
})()
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="project">
      <h1>{{ project.name }}</h1>
      <p>Created At: {{ project.created_at }}</p>
      <p>Status: {{ project.status }}</p>
    </div>
    <div v-else>
      <h1>Project not found</h1>
    </div>

    <RouterLink
      :to="{
        name: '/projects/',
      }"
      >Projects</RouterLink
    >
  </div>
</template>
