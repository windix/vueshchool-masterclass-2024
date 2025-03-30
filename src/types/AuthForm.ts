export type LoginForm = {
  email: string
  password: string
}

export type RegisterForm = LoginForm & {
  username: string
  first_name: string
  last_name: string
}
