import type { QueryData } from '@supabase/supabase-js'
import supabase from './supabaseClient'

export const tasksWithProjectsQuery = supabase.from('tasks').select(`
  *,
  projects (
    id, name, slug
  )
`)

export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

export type TaskWithProjects = TasksWithProjects[0]

export const projectsQuery = supabase.from('projects').select()

export type Projects = QueryData<typeof projectsQuery>

export type Project = Projects[0]

export const projectBySlugQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
    *,
    tasks (
      id, name, status, due_date
    )
    `,
    )
    .eq('slug', slug)
    .single()

export type ProjectWithTasks = QueryData<ReturnType<typeof projectBySlugQuery>>

export const profileQuery = (userId: string) =>
  supabase.from('profiles').select(`*`).eq('id', userId).single()

export type Profile = QueryData<ReturnType<typeof profileQuery>>
