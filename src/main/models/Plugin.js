import { join } from 'path';
import { appState } from '../state';

export class TodoPlugin {
  constructor(pluginConfig) {
    this.name = pluginConfig.name;
    this.index = join(pluginConfig.root, pluginConfig.index);
    this.component = pluginConfig.component;

    this.root = pluginConfig.root || '';
    this.api = null;
  }

  getMainComponent() {
    //console.log('INDEX: ', this.index);
    if (!this.index) {
      return null;
    }
    /*console.log(
      'COMPONENT PATH: ',
      join(this.root, this.index),
      this.component
    );*/
    /*return () => {
      const comp = import(join(this.root, this.index))[this.component];
      console.log('THIS IS THE LOADED COMP: ', comp);
      return comp;
    }; return eval(
      'require'
    )(join(this.root, this.index))[this.component];*/

    return {
      path: join(this.root, this.index),
      name: this.component
    };
  }

  install() {
    function updateApi(api) {
      this.api = api;
      return Promise.resolve(api);
    }

    if (!this.index || this.index.length <= 0) {
      // TODO: return null when there is no installer/api so the client can ignore it

      return Promise.resolve({});
    }
    // TODO: Add error handling
    // ('PATH: ------------------ ', join(this.root, this.index));

    let installer = eval('require')(/* webpackIgnore: true */ this.index);

    if (!(installer instanceof Function)) {
      installer = installer.default;
    }

    return installer(appState.client).then(updateApi.bind(this));
  }
}
