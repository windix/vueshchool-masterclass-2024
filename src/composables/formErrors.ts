import type { AuthError } from '@supabase/auth-js'
import type { LoginForm } from '@/types/AuthForm'

export const useFormErrors = () => {
  const serverError = ref('')

  const handleServerError = (error: AuthError) => {
    if (error.message === 'Invalid login credentials') {
      serverError.value = 'Invalid email or password'
    } else {
      serverError.value = error.message
    }
  }

  type FormErrors<T> = {
    [K in keyof T]: T[K][]
  }

  const realtimeErrors = ref<FormErrors<LoginForm>>()

  const handleLoginForm = async (formData: LoginForm) => {
    realtimeErrors.value = {
      email: [],
      password: [],
    }

    const { validateEmail, validatePassword } = await import('@/lib/formValidations')

    realtimeErrors.value.email = validateEmail(formData.email)

    realtimeErrors.value.password = validatePassword(formData.password)
  }

  return {
    serverError,
    handleServerError,
    realtimeErrors,
    handleLoginForm,
  }
}
