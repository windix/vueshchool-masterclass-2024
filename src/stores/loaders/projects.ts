import { projectsQuery } from '@/lib/supabaseQueries'
import type { Projects } from '@/lib/supabaseQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects>([])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => projectsQuery)

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

    validateCache()
  }

  const validateCache = async (): Promise<void> => {
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

  return {
    projects,
    getProjects,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectsStore, import.meta.hot))
}
