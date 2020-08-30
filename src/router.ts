import Vue from 'vue';
import Router from 'vue-router';
import Cars from './views/Cars.vue';
import Routes from './views/Routes.vue';
import Car from './components/Car.vue';
import Route from './components/Route.vue';

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
      path: '/cars/:id',
      name: 'car',
      component: Car,
    },
    {
      path: '/routes',
      name: 'routes',
      component: Routes,
    },
    {
      path: '/routes/:id',
      name: 'route',
      component: Route,
    },
    {
      path: '**',
      redirect: '/',
    },
  ],
});
