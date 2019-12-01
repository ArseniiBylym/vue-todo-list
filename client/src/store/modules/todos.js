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
    s$todos__todos: state => state.todos,
    s$todos__filteredTodos: state =>
      state.todos.filter(item => (state.filter === 1 ? item.done : state.filter === 2 ? !item.done : item)),
    s$todos__loading: state => state.loading,
    s$todos__getFilter: state => state.filter,
  },
  mutations: {
    s$todos__setTodos: (state, payload) => {
      state.todos = payload;
    },
    s$todos__addTodo: (state, payload) => {
      state.todos = [...state.todos, payload];
    },
    s$todos__updateTodo: (state, payload) => {
      state.todos = state.todos.map(item => (payload._id === item._id ? payload : item));
    },
    s$todos__deleteTodo: (state, payload) => {
      state.todos = state.todos.filter(item => item._id !== payload)
    },
    s$todos__changeFilter: (state, payload) => {
      state.filter = payload;
    },
    s$todos__switchLoading: (state, payload) => {
      state.loading = payload;
    },
    s$todos__switchLoadingError: (state, payload) => {
      state.loadingError = payload;
    }
  },
  actions: {
    async s$todos__fetchTodos({commit}) {
      commit('s$todos__switchLoading', true);
      try {
        const res = await fetchApi.get(URL_PATH.TODOS);
        commit('s$todos__setTodos', res.data);
      } catch (err) {
        commit('s$todos__switchLoadingError', err.message)
      } finally {
        commit('s$todos__switchLoading', false)
      }
    },
    async s$todos__addTodo({commit}, todo) {
      try {
        const res = await fetchApi.post(URL_PATH.TODOS, todo);
        commit('s$todos__addTodo', res.data);
      } catch (err) {
        commit('s$todos__switchLoadingError', err.message)
      } 
    },
    async s$todos__updateTodo({commit}, todo) {
      try {
        const res = await fetchApi.put(`${URL_PATH.TODOS}/${todo._id}`, todo);
        commit('s$todos__updateTodo', res.data);
      } catch (err) {
        commit('s$todos__switchLoadingError', err.message)
      } 
    },
    async s$todos__deleteTodo({commit}, id) {
      try {
        const res = await fetchApi.delete(`${URL_PATH.TODOS}/${id}`);
        commit('s$todos__deleteTodo', res.data._id);
      } catch (err) {
        commit('s$todos__switchLoadingError', err.message)
      } 
    },
    async s$todos__changeFilter({commit}, filterType) {
      commit('s$todos__changeFilter', filterType)
    }
  },
};

export default todosStore;
