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
    async logout() {
      // console.log('user logout')
      // this.$patch({
      //   user: {},
      // })
      this.user = null
    },
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
})
