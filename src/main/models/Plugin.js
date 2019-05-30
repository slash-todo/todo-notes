import { join } from 'path';
import { appState } from '../state';

export class TodoPlugin {
  constructor(pluginConfig) {
    this.name = pluginConfig.name;
    this.index = pluginConfig.index;
    this.installer = pluginConfig.install;

    this.root = pluginConfig.root || '';
    this.api = null;
  }

  get component() {
    return null;
  }

  install() {
    function updateApi(api) {
      this.api = api;
      return Promise.resolve(api);
    }

    if (!this.installer || this.installer.length <= 0) {
      // TODO: return null when there is no installer/api so the client can ignore it

      return Promise.resolve({});
    }

    const installer = eval('require')(
      /* webpackIgnore: true */ join(this.root, this.installer)
    );

    return installer(appState.client).then(updateApi.bind(this));
  }
}
