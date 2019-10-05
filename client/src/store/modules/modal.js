const modalStore = {
  namespaced: true,
  state: {
    open: false,
    data: null,
    edit: false,
  },
  getters: {
    isOpen: state => state.open,
    fields: state => state.data,
    isEdit: state => state.edit,
  },
  mutations: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    },
    setData(state, data) {
      state.data = data;
    },
    setEditMode(state, payload) {
      state.edit = payload;
    },
    clearData(state) {
      state.data = null;
    },
  },
  actions: {
    async open({commit}) {
      commit('open');
    },
    async edit({commit}, data) {
      commit('setData', data);
      commit('open');
      commit('setEditMode', true)
    },
    async close({commit}) {
      commit('close');
      commit('clearData');
      commit('setEditMode', false)
    },
  },
};

export default modalStore;
