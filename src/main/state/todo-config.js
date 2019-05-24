import { DEFAULT_CONFIG_PATH, DEFAULT_PLUGINS_PATH } from './constants';

const setDefaults = Symbol('setDefaults');

export class TodoConfig {
  constructor(config) {
    if (config) {
      this.configPath = config.configPath;
      this.plugins = config.plugins;
    } else {
      this[setDefaults]();
    }
  }

  [setDefaults]() {
    this.configPath = DEFAULT_CONFIG_PATH;
    this.plugins = {
      path: DEFAULT_PLUGINS_PATH,
      installed: []
    };
  }
}
