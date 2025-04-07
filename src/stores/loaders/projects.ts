import { projectsQuery, projectWithTasksQuery } from '@/lib/supabaseQueries'
import type { Projects, ProjectWithTasks } from '@/lib/supabaseQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects>([])
  const project = ref<ProjectWithTasks | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => projectsQuery())

  const loadProjectBySlug = useMemoize(async (slug: string) =>
    projectWithTasksQuery({ column: 'slug', value: slug }),
  )

  const getProjects = async (): Promise<void> => {
    projects.value = []

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

    validateCache({
      ref: projects,
      key: 'projects',
      queryFn: () => projectsQuery(),
      loaderFn: loadProjects,
    })
  }

  const { profiles: collabs, getProfilesByIds } = useCollabs()

  const getProjectBySlug = async (slug: string): Promise<ProjectWithTasks | null> => {
    project.value = null

    const { data, error, status } = await loadProjectBySlug(slug)

    if (error && !data) {
      useErrorStore().setPostgrestError({
        error,
        status,
      })

      return null
    }

    // TODO: cache collabs?
    if (data.collaborators.length > 0) {
      await getProfilesByIds(data.collaborators)
    }

    project.value = data

    validateCache({
      ref: project,
      key: slug,
      queryFn: () => projectWithTasksQuery({ column: 'slug', value: slug }),
      loaderFn: loadProjectBySlug,
    })

    return data
  }

  type ValidateCacheArgs = {
    ref: typeof projects | typeof project
    key: string
    queryFn: (...args: unknown[]) => ReturnType<typeof projectsQuery | typeof projectWithTasksQuery>
    loaderFn: typeof loadProjects | typeof loadProjectBySlug
  }

  const validateCache = async ({ ref, key, queryFn, loaderFn }: ValidateCacheArgs) => {
    const { data, error } = await queryFn()

    if (error) {
      console.error(error)
      return
    }

    if (JSON.stringify(ref.value) === JSON.stringify(data)) {
      return
    } else {
      // force reload next time
      loaderFn.delete(key)
      if (data) {
        ref.value = data
      }
    }
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
