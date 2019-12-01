<template>
  <div class="layout">
    <div class="header">
      <Header />
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <ModalTodo />
  </div>
</template>

<script>
import ModalTodo from '@/components/ModalTodo';
import Header from '@/components/Header'
export default {
  name: 'Layout',
  components: {
    Header,
    ModalTodo
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
}
.header {
  flex-grow: 0;
  position: relative;
}
.content {
  flex-grow: 1;
}
</style>