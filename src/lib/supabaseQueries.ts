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
