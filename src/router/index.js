import Router from 'vue-router';
import Vue from 'vue';
import Main from '@/view/Main';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: Main },
  ],
});
