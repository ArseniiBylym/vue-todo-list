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
      <span class="edit" @click="edit(item)">Edit</span>
      <span class="delete" @click="handleDelete">Delete</span>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: 'todo',
  props: ['item'],
  methods: {
    ...mapActions('todos', [
      'updateTodo',
      'deleteTodo'
    ]),
    ...mapActions('modal', [
      'edit'
    ]),
    handleChange() {
      this.updateTodo({...this.item, done: !this.item.done})
    },
    handleDelete() {
      this.deleteTodo(this.item._id)
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