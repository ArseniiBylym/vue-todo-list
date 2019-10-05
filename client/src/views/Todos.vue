<template>
  <Layout>
    <div class="todos">
      <h1>Todos</h1>
      <div v-if="loading" class="spinner">Loading...</div>
      <div v-else class="content">
        <template v-if="!todos.length">
          <h3>Todo list is empty now</h3>
        </template>
        <template v-else>
          <FilterSelect />
          <Todo v-for="todo in filteredTodos" :key="todo._id" :item="todo" />
        </template>
        <button @click="open">+ New</button>
      </div>
    </div>
  </Layout>
</template>

<script>
import {Layout, Todo, FilterSelect} from '@/components';
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'todos',
  components: {
    Layout,
    Todo,
    FilterSelect
  },
  computed: {
    ...mapGetters('todos', ['todos', 'filteredTodos', 'loading']),
  },
  methods: {
    ...mapActions('todos', ['fetchTodos']),
    ...mapActions('modal', ['open'])
  },
  mounted() {
    this.fetchTodos();
  },
  updated() {
    console.log(this.filteredTodos)
  }
};
</script>

<style lang="scss" scoped>
  .content {
    max-width: 500px;
    margin: auto;
  }
</style>
