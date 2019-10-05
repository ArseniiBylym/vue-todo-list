import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {auth: false}
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth'),
      redirect: '/auth/login',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ '@/views/Auth/Login'),
          meta: {auth: false}
        },
        {
          path: 'register',
          name: 'register',
          component: () => import(/* webpackChunkName: "register" */ '@/views/Auth/Register'),
          meta: {auth: false}
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile'),
      meta: {auth: true}
    },
    {
      path: '/todos',
      name: 'todos',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Todos.vue'),
      meta: {auth: true}
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(store.getters['auth/isAuth'])
  const isAuth = store.getters['auth/isAuth'];
  console.log(to)
  if(isAuth && !to.meta.auth) {
    next('/todos')
  }
  if(!isAuth && to.meta.auth) {
    next('/auth/login')
  }
  next();
})

export default router;
