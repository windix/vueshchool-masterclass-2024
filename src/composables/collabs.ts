import { profilesByIdsQuery } from '@/lib/supabaseQueries'
import type { Profiles, Projects, TasksWithProjects } from '@/lib/supabaseQueries'

export type GroupedCollabs = Record<number, Profiles>

export const useCollabs = () => {
  const profiles = ref<Profiles>([])

  const groupedCollabs = ref<GroupedCollabs>({})

  const getProfilesByIds = async (ids: string[]) => {
    const { data, error } = await profilesByIdsQuery(ids)

    if (error || !data) {
      console.error(error)
      return []
    }

    profiles.value = data
    return data
  }

  const getGroupedCollabs = async (items: Projects | TasksWithProjects) => {
    const result = await Promise.all(
      items
        .filter((item) => item.collaborators.length > 0)
        .map(async (item) => [item.id, await getProfilesByIds(item.collaborators)]),
    )

    groupedCollabs.value = Object.fromEntries(result)
    return groupedCollabs.value
  }

  return {
    profiles,
    getProfilesByIds,
    groupedCollabs,
    getGroupedCollabs,
  }
}
