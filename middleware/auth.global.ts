import { useUserStore } from "@/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (!userStore.user.id && !to.meta.layout) {
    return navigateTo("/login");
  }
});
