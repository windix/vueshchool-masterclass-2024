import type { LoginForm, RegisterForm } from '@/types/AuthForm'
import supabase from './supabaseClient'

export const signUp = async (formData: RegisterForm) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    console.error('Error signing up:', error)
    return false
  }

  if (data.user) {
    console.log('User signed up:', data)

    const profile = {
      id: data.user.id,
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
    }

    const { error } = await supabase.from('profiles').insert(profile)

    if (error) {
      console.error('Error inserting profile:', error)
      return false
    }

    await useAuthStore().setAuth(data.session)
    return true
  }
}

export const signIn = async (formData: LoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    console.error('Error signing in:', error)
    return false
  }

  if (data.user) {
    console.log('User signed in:', data)

    await useAuthStore().setAuth(data.session)
    return true
  }
}

export const retrieveSession = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error retrieving session:', error)
    return
  }

  await useAuthStore().setAuth(data.session)
}
