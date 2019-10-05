import {URL_PATH, fetchApi} from '@/api/index';

const todosStore = {
  namespaced: true,
  state: {
    todos: [],
    filter: 0,
    loading: false,
    loadingError: false,
  },
  getters: {
    todos: state => state.todos,
    filteredTodos: state =>
      state.todos.filter(item => (state.filter === 1 ? item.done : state.filter === 2 ? !item.done : item)),
    loading: state => state.loading,
    filter: state => state.filter,
  },
  mutations: {
    setTodos: (state, payload) => {
      state.todos = payload;
    },
    addTodo: (state, payload) => {
      state.todos = [...state.todos, payload];
    },
    updateTodo: (state, payload) => {
      state.todos = state.todos.map(item => (payload._id === item._id ? payload : item));
    },
    deleteTodo: (state, payload) => {
      state.todos = state.todos.filter(item => item._id !== payload)
    },
    changeFilter: (state, payload) => {
      state.filter = payload;
    },
    switchLoading: (state, payload) => {
      state.loading = payload;
    },
    switchLoadingError: (state, payload) => {
      state.loadingError = payload;
    }
  },
  actions: {
    async fetchTodos({commit}) {
      console.log('loading')
      commit('switchLoading', true);
      try {
        const res = await fetchApi.get(URL_PATH.TODOS);
        console.log(res)
        commit('setTodos', res.data);
      } catch (err) {
        console.log({err})
        commit('switchLoadingError', err.message)
      } finally {
        commit('switchLoading', false)
      }
    },
    async addTodo({commit}, todo) {
      try {
        const res = await fetchApi.post(URL_PATH.TODOS, todo);
        commit('addTodo', res.data);
      } catch (err) {
        commit('switchLoadingError', err.message)
      } 
    },
    async updateTodo({commit}, todo) {
      try {
        const res = await fetchApi.put(`${URL_PATH.TODOS}/${todo._id}`, todo);
        commit('updateTodo', res.data);
      } catch (err) {
        commit('switchLoadingError', err.message)
      } 
    },
    async deleteTodo({commit}, id) {
      try {
        const res = await fetchApi.delete(`${URL_PATH.TODOS}/${id}`);
        commit('deleteTodo', res.data._id);
      } catch (err) {
        commit('switchLoadingError', err.message)
      } 
    },
    async changeFilter({commit}, filterType) {
      commit('changeFilter', filterType)
    }
  },
};

export default todosStore;
