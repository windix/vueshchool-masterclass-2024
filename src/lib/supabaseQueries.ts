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

export const projectsQuery = () =>
  supabase.from('projects').select().order('updated_at', { ascending: false })

export type Projects = QueryData<ReturnType<typeof projectsQuery>>

export type Project = Projects[0]

export const projectWithTasksQuery = ({ column, value }: { column: string; value: string }) =>
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
    .eq(column, value)
    .single()

export type ProjectWithTasks = QueryData<ReturnType<typeof projectWithTasksQuery>>

export const profileQuery = ({ column, value }: { column: string; value: string }) =>
  supabase.from('profiles').select(`*`).eq(column, value).single()

export type Profile = QueryData<ReturnType<typeof profileQuery>>

export const profilesByIdsQuery = (ids: string[]) =>
  supabase.from('profiles').select().in('id', ids)
// .order('username', { ascending: true })

export type Profiles = QueryData<ReturnType<typeof profilesByIdsQuery>>

export const profilesQuery = () =>
  supabase.from('profiles').select().order('username', { ascending: true })

export const updateProjectQuery = (id: number, data: Partial<Omit<Project, 'id'>>) =>
  supabase.from('projects').update(data).eq('id', id).select().single()

export const insertTaskQuery = (
  data: Omit<TaskWithProjects, 'id' | 'projects' | 'created_at' | 'updated_at'>,
) => supabase.from('tasks').insert(data).select().single()
