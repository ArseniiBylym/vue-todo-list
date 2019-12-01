const authStore = {
  namespaced: true,
  state: {
    user: true,
    loading: false,
  },
  getters: {
    s$auth__user: state => state.user,
    s$auth__isAuth: state => !!state.user,
    s$auth__isLoading: state => state.loading
  },
  mutations: {
    s$auth__login (state, user) {
      state.user = user;
    },
    s$auth__logout(state) {
      state.user = null;
    },
    s$auth__switchLoading(state, value) {
      state.loading = value;
    }
  },
  actions: {
    async s$auth__login({commit}, user) {
      commit('s$auth__switchLoading', true)
      setTimeout(() => {
        commit('s$auth__login', user);
        commit('s$auth__switchLoading', false)
      }, 2000)
    },
    async s$auth__logout({commit}) {
      commit('s$auth__switchLoading', true)
      setTimeout(() => {
        commit('s$auth__logout');
        commit('s$auth__switchLoading', false)
      }, 2000)
    }
  }
}

export default authStore;