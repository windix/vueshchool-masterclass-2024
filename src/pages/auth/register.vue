<script setup lang="ts">
import { signUp } from '@/lib/supabaseAuth'
import type { RegisterForm } from '@/types/AuthForm'

const router = useRouter()

const formData = ref<
  RegisterForm & {
    confirm_password: string
  }
>({
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
})

const register = async () => {
  if (await signUp(formData.value)) {
    router.push('/')
  }
}
</script>

<template>
  <div
    class="mx-auto -mt-10 flex h-full min-h-[90vh] w-full items-center justify-center p-10 text-center"
  >
    <Card class="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Register </CardTitle>
        <CardDescription> Create a new account </CardDescription>
      </CardHeader>
      <CardContent>
        <!--
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full"> Register with Google </Button>
          <Separator label="Or" />
        </div>
        -->
        <form class="grid gap-4" @submit.prevent="register">
          <div class="grid gap-2">
            <Label id="username" class="text-left">Username</Label>
            <Input
              id="username"
              v-model="formData.username"
              type="text"
              placeholder="johndoe19"
              required
            />
          </div>
          <div class="flex flex-col justify-between gap-4 sm:flex-row">
            <div class="grid gap-2">
              <Label id="first_name" class="text-left">First Name</Label>
              <Input
                id="first_name"
                v-model="formData.first_name"
                type="text"
                placeholder="John"
                required
              />
            </div>
            <div class="grid gap-2">
              <Label id="last_name" class="text-left">Last Name</Label>
              <Input
                id="last_name"
                v-model="formData.last_name"
                type="text"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="johndoe19@example.com"
              required
            />
          </div>

          <div class="grid gap-2">
            <Label id="password" class="text-left">Password</Label>
            <Input
              id="password"
              v-model="formData.password"
              type="password"
              placeholder="*****"
              autocomplete
              required
            />
          </div>

          <div class="grid gap-2">
            <Label id="confirm_password" class="text-left">Confirm Password</Label>
            <Input
              id="confirm_password"
              v-model="formData.confirm_password"
              type="password"
              placeholder="*****"
              autocomplete
              required
            />
          </div>
          <Button type="submit" class="w-full"> Register </Button>
          <!-- <Button variant="outline" class="w-full"> Login with Google </Button> -->
        </form>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <RouterLink to="/auth/login" class="underline"> Login </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
