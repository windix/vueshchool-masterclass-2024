import type { CustomError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const error = ref<CustomError | null>(null)

  function setError(inputError: { error: Error; customCode?: number }) {
    error.value = inputError.error
    error.value.customCode = inputError.customCode
  }

  // {
  //   "code": "PGRST116",
  //   "details": "The result contains 0 rows",
  //   "hint": null,
  //   "message": "JSON object requested, multiple (or no) rows returned"
  // }

  function setPostgrestError(inputError: { error: PostgrestError; status: number }) {
    error.value = new Error(`[${inputError.error.code}] ${inputError.error.details}`)
    error.value.customCode = inputError.status
  }

  function clearError() {
    error.value = null
  }

  return { error, setError, setPostgrestError, clearError }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
}
