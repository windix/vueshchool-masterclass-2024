<script setup lang="ts">
import { signIn } from '@/lib/supabaseAuth'
import type { LoginForm } from '@/types/AuthForm'
import { watchDebounced } from '@vueuse/core'

const formData = ref<LoginForm>({
  email: '',
  password: '',
})

const { serverError, handleServerError, realtimeErrors, handleLoginForm } = useFormErrors()

const router = useRouter()

watchDebounced(
  formData,
  () => {
    handleLoginForm(formData.value)
  },
  {
    debounce: 500, // 0.5s debounce
    deep: true,
  },
)

const login = async () => {
  const { error } = await signIn(formData.value)

  if (error) {
    handleServerError(error)
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="mx-auto -mt-20 flex min-h-[90vh] w-full items-center justify-center p-10 text-center">
    <Card class="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <!--
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full"> Register with Google </Button>
          <Separator label="Or" />
        </div>
        -->

        <form class="grid gap-4" @submit.prevent="login">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              id="email"
              type="email"
              v-model="formData.email"
              placeholder="johndoe19@example.com"
              required
              :class="{ 'border-red-500': serverError }"
            />
            <ul v-if="realtimeErrors?.email.length" class="ml-4 text-left text-sm text-red-500">
              <li v-for="error in realtimeErrors.email" :key="error" class="list-disc">
                {{ error }}
              </li>
            </ul>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label id="password">Password</Label>
              <a href="#" class="ml-auto inline-block text-xs underline"> Forgot your password? </a>
            </div>
            <Input
              id="password"
              v-model="formData.password"
              type="password"
              autocomplete
              required
              :class="{ 'border-red-500': serverError }"
            />
            <ul v-if="realtimeErrors?.password.length" class="ml-4 text-left text-sm text-red-500">
              <li v-for="error in realtimeErrors.password" :key="error" class="list-disc">
                {{ error }}
              </li>
            </ul>
          </div>

          <ul v-if="serverError" class="ml-4 text-left text-sm text-red-500">
            <li class="list-disc">
              {{ serverError }}
            </li>
          </ul>

          <Button type="submit" class="w-full"> Login </Button>
        </form>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <RouterLink to="/auth/register" class="underline"> Register </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
