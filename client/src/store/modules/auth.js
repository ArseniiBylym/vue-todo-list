const authStore = {
  namespaced: true,
  state: {
    user: true,
    loading: false,
  },
  getters: {
    user: state => state.user,
    isAuth: state => !!state.user,
    isLoading: state => state.loading
  },
  mutations: {
    login (state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
    switchLoading(state, value) {
      state.loading = value;
    }
  },
  actions: {
    async login({commit}, user) {
      commit('switchLoading', true)
      setTimeout(() => {
        commit('login', user);
        commit('switchLoading', false)
      }, 2000)
    },
    async logout({commit}) {
      commit('switchLoading', true)
      setTimeout(() => {
        commit('logout');
        commit('switchLoading', false)
      }, 2000)
    }
  }
}

export default authStore;