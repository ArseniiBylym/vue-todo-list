<template>
  <div class="todo">
    <div class="checkbox">
      <input type="checkbox" :checked="item.done" @change="handleChange">
    </div>
    <div class="content">
      <div class="title">{{item.title}}</div>
      <div class="text">{{item.text}}</div>
    </div>
    <div class="controls">
      <span class="edit" @click="handleEdit(item)">Edit</span>
      <span class="delete" @click="handleDelete">Delete</span>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: 'Todo',
  props: ['item'],
  methods: {
    ...mapActions('modal', ['s$modal__edit']),
    ...mapActions('todos', ['s$todos__updateTodo', 's$todos__deleteTodo']),
    handleEdit(item) {
      this.s$modal__edit(item);
    },
    handleChange() {
      this.s$todos__updateTodo({...this.item, done: !this.item.done})
    },
    handleDelete() {
      this.s$todos__deleteTodo(this.item._id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .todo {
    margin: 1rem auto;
    padding: 1rem;
    background-color: #efefef;
    color: black;
    min-width: 400px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
  .content {
    flex-grow: 1;
  }
  .controls {
    span{
      margin: 0 1rem;
      cursor: pointer;
    }
  }
</style>