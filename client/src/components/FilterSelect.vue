<template>
  <div class="filter">
    <select name="filter" :value="filter" @change="handleChange">
      <option value="0">All</option>
      <option value="1" >Completed</option>
      <option value="2">Not completed</option>
    </select>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  computed: {
    ...mapGetters('todos', [
      'filter'
    ])
  },
  methods: {
    ...mapActions('todos', [
      'changeFilter'
    ]),
    handleChange(e) {
      this.changeFilter(Number(e.target.value))
    }
  }
}
</script>

<style lang="scss" scoped>
  select {
    display: block;
    margin: auto;
  }
</style>