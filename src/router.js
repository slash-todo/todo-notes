import Vue from 'vue';
import Router from 'vue-router';
import { remote } from 'electron';

import { SettingsContainer } from './renderer/components';
import Landing from './renderer/Landing.vue';

import { RendererInitializer } from './renderer/initializer';

Vue.use(Router);

const initializer = new RendererInitializer();
initializer.init();

function externalComponent(url) {
  return new Promise((resolve, reject) => {
    const name = url
      .split('/')
      .reverse()[0]
      .match(/^(.*?)\.umd/)[1];
    const script = document.createElement('script');
    script.async = true;
    script.addEventListener('load', () => {
      resolve(window[name]);
    });
    script.addEventListener('error', () => {
      reject(new Error(`Error loading ${url}`));
    });
    script.src = url;
    document.head.appendChild(script);
  });
}

let pluginRoutes = remote.getGlobal('routes');
pluginRoutes = pluginRoutes.map(r => ({
  ...r,
  component: () =>
    Promise.resolve(eval('require')(r.component.path)[r.component.name])
}));

const router = new Router({
  routes: [
    {
      path: '/',
      component: Landing
    },
    {
      path: '/settings',
      component: SettingsContainer
    },
    ...pluginRoutes
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
