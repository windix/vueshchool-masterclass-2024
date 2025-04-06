export const fallbackInitials = (profile: {
  first_name: string | null
  last_name: string | null
}) =>
  profile.first_name && profile.last_name
    ? `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`
    : ''
