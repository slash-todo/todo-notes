import Vue from 'vue';
import Router from 'vue-router';

import Landing from './renderer/Landing.vue';
import StickyBoard from '../plugins/stickies/StickyBoard.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Landing
    },
    {
      path: '/plugins/stickies',
      component: StickyBoard
    }
  ]
});
