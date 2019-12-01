<template>
  <div class="header">
    <div class="logo">Logo</div>
    <nav class="links">
      <router-link to="/" active-class="active" exact>Home</router-link>
      <router-link v-if="s$auth__isAuth" to="/todos" active-class="active">Todos</router-link>
    </nav>
    <router-link v-if="s$auth__isAuth" to="/profile" active-class="active">Profile</router-link>
    <router-link v-else to="/auth/login" active-class="active">Login</router-link>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'Header',
  computed: {
    ...mapGetters('auth', [
      's$auth__isAuth'
    ]),
  },
};
</script>

<style lang="scss" scoped>
.header {
  /* width: 100%; */
  padding: 1rem;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  background-color: #30b08f;
  color: black;
}
.logo {
  margin: 0 2rem;
  font-size: 1.5rem;
}
.links {
  flex-grow: 1;
  text-align: left;
}
a {
  margin: 0 1rem;
  &:hover,
  &.active {
    text-decoration: underline;
    color: white;
  }
}
</style>