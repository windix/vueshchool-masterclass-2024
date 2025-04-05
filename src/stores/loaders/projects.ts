import { projectsQuery, projectWithTasksQuery } from '@/lib/supabaseQueries'
import type { Projects, ProjectWithTasks } from '@/lib/supabaseQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects>([])
  const project = ref<ProjectWithTasks | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => projectsQuery)

  const loadProjectBySlug = useMemoize(async (slug: string) =>
    projectWithTasksQuery({ column: 'slug', value: slug }),
  )

  const getProjects = async (): Promise<void> => {
    const { data, error } = await loadProjects('projects')

    if (error) {
      console.error(error)
      // do not cache on error
      loadProjects.delete('projects')
      return
    }

    if (data) {
      projects.value = data
    }

    validateProjectsCache()
  }

  const { profiles: collabs, getProfilesByIds } = useCollabs()

  const getProjectBySlug = async (slug: string): Promise<ProjectWithTasks | null> => {
    const { data, error } = await loadProjectBySlug(slug)

    if (error && !data) {
      console.error(error)
      return null
    }

    // TODO: cache collabs?
    if (data.collaborators.length > 0) {
      await getProfilesByIds(data.collaborators)
    }

    project.value = data
    // usePageStore().pageData.title = data.name

    validateProjectCache(slug)

    return data
  }

  const validateProjectsCache = async (): Promise<void> => {
    projectsQuery.then(({ data, error }) => {
      if (error) {
        console.error(error)
        return
      }

      if (JSON.stringify(projects.value) === JSON.stringify(data)) {
        return
      } else {
        // force reload next time
        loadProjects.delete('projects')
        if (data) {
          projects.value = data
        }
      }
    })
  }

  const validateProjectCache = async (slug: string): Promise<void> => {
    projectWithTasksQuery({ column: 'slug', value: slug }).then(({ data, error }) => {
      if (error) {
        console.error(error)
        return
      }

      if (JSON.stringify(projects.value) === JSON.stringify(data)) {
        return
      } else {
        // force reload next time
        loadProjectBySlug.delete(slug)
        if (data) {
          project.value = data
        }
      }
    })
  }

  return {
    projects,
    getProjects,
    project,
    collabs,
    getProjectBySlug,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectsStore, import.meta.hot))
}
