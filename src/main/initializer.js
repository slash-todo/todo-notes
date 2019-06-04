import { appState, TodoConfig } from './state';
import { PluginService } from './services';
import { ConfigUtils, map, parallel, flatMap, tap } from './utils';
import { lstatSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
import { DEFAULT_CONFIG_FILENAME } from './state/constants';
import { TodoPlugin } from './models';

const loadAndInitConfig = Symbol('loadAndInitConfig');
const initCorePlugins = Symbol('installCorePlugins');
const initUserPlugins = Symbol('initUserPlugins');

export class Initializer {
  constructor(window) {
    this.window = window;
    this.appState = appState;

    this.pluginService = new PluginService();

    this.init = this.init.bind(this);
    this[initCorePlugins] = this[initCorePlugins].bind(this);
    this[initUserPlugins] = this[initUserPlugins].bind(this);
  }

  [loadAndInitConfig]() {
    console.log('Load and init configuration...');
    return ConfigUtils.loadConfig(appState.config.configPath).then(config => {
      appState.config = new TodoConfig(config);
      return config;
    });
  }

  [initCorePlugins](config) {
    console.log('Initializing core plugins...');

    function getPluginDirectoryList(pluginPath) {
      console.log('[Core Plugins] Get Plugin directory list...');
      function isDirectory(source) {
        return lstatSync(source).isDirectory();
      }

      function getDirectories(source) {
        return readdirSync(source)
          .map(name => join(source, name))
          .filter(isDirectory);
      }

      try {
        return getDirectories(pluginPath);
      } catch (error) {
        throw new Error(
          `Error loading plugin directory list! Error: '${error}'.`
        );
      }
    }

    function toConfigPath(path) {
      console.log('[Core Plugins] To config path...');
      function appendConfigFilename(pluginPath) {
        return join(pluginPath, DEFAULT_CONFIG_FILENAME);
      }

      return appendConfigFilename(path);
      //return paths.map(appendConfigFilename);
    }

    function toPlugin(config) {
      console.log('[Core Plugins] To TodoPlugin...');
      return new TodoPlugin(config);
    }

    const corePluginsPath = resolve(join(config.plugins.path, 'core'));
    return Promise.resolve(corePluginsPath)
      .then(flatMap(getPluginDirectoryList))
      .then(map(toConfigPath))
      .then(flatMap(ConfigUtils.loadConfig))
      .then(map(toPlugin));
  }

  [initUserPlugins](config) {
    function downloadPlugins(plugins) {
      console.log('[User Plugins] Downloading user plugins...');
      return this.pluginService.downloadPlugins(plugins);
    }

    function toPlugin(config) {
      console.log('[User Plugins] To TodoPugin...');
      return new TodoPlugin(config);
    }

    return Promise.resolve(config.plugins.installed)
      .then(map(downloadPlugins.bind(this)))
      .then(map(ConfigUtils.loadConfig))
      .then(map(toPlugin));
  }

  init() {
    function updateGlobal([core, user]) {
      global.plugins = {
        core,
        user
      };
    }

    this[loadAndInitConfig]()
      .then(parallel(this[initCorePlugins], this[initUserPlugins]))
      .then(tap(updateGlobal))
      .then(res => {
        console.log('THIS IS THE SETUP RESULT: ', res);
      })
      .catch(error => {
        console.error('Error in SETUP: ', error);
      });
  }
}
