import { useUserStore } from "@/store/user";

export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore();

  if(!userStore.user) {
    console.log("passou pelo login middleware")
    return navigateTo('/login')
  }
})
