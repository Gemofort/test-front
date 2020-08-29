import Vue from 'vue';
import Router from 'vue-router';
import Cars from './views/Cars.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Cars,
    },
    {
      path: '**',
      redirect: '/',
    },
  ],
});
