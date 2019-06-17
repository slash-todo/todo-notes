import { remote, ipcRenderer } from 'electron';

import { flatMap, tap } from '../main/utils';
import { ClientActions } from '../shared/actions';

const installPlugin = Symbol('installPlugin');
const updateViewRoutes = Symbol('updateViewRoutes');

export class RendererInitializer {
  constructor() {
    this.routes = [];

    this[updateViewRoutes] = this[updateViewRoutes].bind(this);
  }

  [installPlugin](plugin) {
    console.log('ISNTALL PLUGIN...', plugin);
    return plugin.install().then(api => Promise.resolve({ ...plugin, api }));
  }

  [updateViewRoutes](plugins) {
    const routes = plugins
      .filter(p => !!p.component)
      .map(p => ({
        path: `/plugins/${p.name}`,
        component: eval('require')(p.index)[p.component]
      }));

    this.routes = [...this.routes, ...routes];
  }

  init() {
    function addPluginsToClient(plugins) {
      ipcRenderer.send(ClientActions.ADD_PLUGINS, plugins);
    }

    const { core = [], user = [] } = remote.getGlobal('plugins');

    if (core) {
      return Promise.resolve(core)
        .then(flatMap(this[installPlugin]))
        .then(tap(addPluginsToClient))
        .then(tap(this[updateViewRoutes]))
        .then(() => Promise.resolve(user))
        .then(flatMap(this[installPlugin]))
        .then(tap(addPluginsToClient))
        .then(tap(this[updateViewRoutes]))
        .then(() => this.routes);
    }

    return Promise.resolve([]);
  }
}
