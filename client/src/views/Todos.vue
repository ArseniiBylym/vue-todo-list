<template>
  <Layout>
    <div class="todos">
      <h1>Todos</h1>
      <div v-if="s$todos__loading" class="spinner">Loading...</div>
      <div v-else class="content">
        <h3 v-if="!s$todos__todos.length">Todo list is empty now</h3>
        <template v-else>
          <FilterSelect />
          <Todo v-for="todo in s$todos__filteredTodos" :key="todo._id" :item="todo" />
        </template>
        <button @click="s$modal__open">+ New</button>
      </div>
    </div>
  </Layout>
</template>

<script>
import {Layout, Todo, FilterSelect} from '@/components';
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'Todos',
  components: {
    Layout,
    Todo,
    FilterSelect
  },
  computed: {
    ...mapGetters('todos', ['s$todos__todos', 's$todos__filteredTodos', 's$todos__loading']),
  },
  methods: {
    ...mapActions('todos', ['s$todos__fetchTodos']),
    ...mapActions('modal', ['s$modal__open'])
  },
  mounted() {
    this.s$todos__fetchTodos();
  },
};
</script>

<style lang="scss" scoped>
  .content {
    max-width: 500px;
    margin: auto;
  }
</style>
