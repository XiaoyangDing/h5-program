import { defineStore } from 'pinia'

export const usePiniaStore = defineStore({
  id: 'main',
  state: () => ({
    userName: '丁小洋',
    token: ''
  }),
  getters: {
    nameLength: (state) => state.userName.length
  },
  actions: {
    getUserName(data: string) {
      this.userName = data
    },
    getToken(token: string) {
      this.userName = token
    }
  }
})
