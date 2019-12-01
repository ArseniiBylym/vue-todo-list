const modalStore = {
  namespaced: true,
  state: {
    open: false,
    data: null,
    edit: false,
  },
  getters: {
    s$modal__isOpen: state => state.open,
    s$modal__getFields: state => state.data,
    s$modal__isEdit: state => state.edit,
  },
  mutations: {
    s$modal__open(state) {
      state.open = true;
    },
    s$modal__close(state) {
      state.open = false;
    },
    s$modal__setData(state, data) {
      state.data = data;
    },
    s$modal__setEditMode(state, payload) {
      state.edit = payload;
    },
    s$modal__clearData(state) {
      state.data = null;
    },
  },
  actions: {
    async s$modal__open({commit}) {
      commit('s$modal__open');
    },
    async s$modal__edit({commit}, data) {
      commit('s$modal__setData', data);
      commit('s$modal__open');
      commit('s$modal__setEditMode', true)
    },
    async s$modal__close({commit}) {
      commit('s$modal__close');
      commit('s$modal__clearData');
      commit('s$modal__setEditMode', false)
    },
  },
};

export default modalStore;
