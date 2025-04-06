// global state
const menuOpen = ref(true)

export const useMenu = () => {
  const toggleMenu = () => (menuOpen.value = !menuOpen.value)

  return {
    menuOpen,
    toggleMenu,
  }
}
