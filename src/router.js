import Vue from 'vue';
import Router from 'vue-router';

import { SettingsContainer } from './renderer/components';
import Landing from './renderer/Landing.vue';

import { RendererInitializer } from './renderer/initializer';

Vue.use(Router);

const initializer = new RendererInitializer();
initializer.init().then(routes => {
  router.addRoutes(routes);
});

const router = new Router({
  routes: [
    {
      path: '/',
      component: Landing
    },
    {
      path: '/settings',
      component: SettingsContainer
    }
  ]
});

/*ipcRenderer.on('set-routes', (event, routes) => {
  /*router.addRoutes([
    {
      path: '/plugins/stickies',
      component: StickyBoard
    }
  ]);

  console.log('REserived. ', routes);
  routes = routes.map(route => ({
    ...route,
    component: eval('require')(route.component.path)[route.name]
  }));
  console.log('Mapped. ', routes);
  router.addRoutes(routes);
  console.log('ROUTER: ', router.options.routes);
});*/

export default router;
