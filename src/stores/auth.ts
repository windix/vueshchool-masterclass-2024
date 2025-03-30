import { profileQuery, type Profile } from '@/lib/supabaseQueries'
import type { Session, User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<User | null>(null)
  const profile = ref<Profile | null>(null)

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      // if profile exists in store and valid we don't need to fetch it again
      const { data, error } = await profileQuery(user.value.id)

      if (error) {
        // TODO: should clear the user session?
        console.error('Error fetching profile:', error)
        profile.value = null
        return
      }

      profile.value = data
    }
  }

  const setAuth = async (userSession: Session | null = null) => {
    if (!userSession) {
      user.value = null
      profile.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  return { user, profile, setAuth }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
