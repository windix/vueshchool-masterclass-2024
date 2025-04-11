import type { AuthError } from '@supabase/auth-js'

export const useFormErrors = () => {
  const serverError = ref('')

  const handleServerError = (error: AuthError) => {
    if (error.message === 'Invalid login credentials') {
      serverError.value = 'Invalid email or password'
    } else {
      serverError.value = error.message
    }
  }

  return {
    serverError,
    handleServerError,
  }
}
