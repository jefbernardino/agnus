import { defineStore } from 'pinia'

// @ts-ignore
export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      user: {},
    }
  },
  actions: {
    async fetchUser(data) {
      this.user = data;
    },
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
})
