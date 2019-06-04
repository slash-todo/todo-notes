import { appState } from './state';
import { PluginService } from './services';
import { ConfigUtils, map } from './utils';
import { TodoConfig } from './state';
import { TodoPlugin } from './models';
import { lstatSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
import { DEFAULT_CONFIG_FILENAME } from './state/constants';

const loadAndInitConfig = Symbol('loadAndInitConfig');
const installCorePlugins = Symbol('installCorePlugins');
const initUserPlugins = Symbol('initUserPlugins');

export class OldInitializer {
  constructor(window) {
    this.window = window;
    this.appState = appState;

    this.pluginService = new PluginService();

    this.init = this.init.bind(this);
    this[installCorePlugins] = this[installCorePlugins].bind(this);
    this[initUserPlugins] = this[initUserPlugins].bind(this);
  }

  [loadAndInitConfig]() {
    console.log('Load and init config...');
    return ConfigUtils.loadConfig(appState.config.configPath).then(config => {
      appState.config = new TodoConfig(config);
      return config;
    });
  }

  [installCorePlugins](config) {
    console.log('Install core plugins...');
    function getPluginDirectoryList(pluginPath) {
      function isDirectory(source) {
        return lstatSync(source).isDirectory();
      }

      function getDirectories(source) {
        return readdirSync(source)
          .map(name => join(source, name))
          .filter(isDirectory);
      }

      //console.log('pluginPath: ', pluginPath);
      return new Promise((resolve, reject) => {
        try {
          resolve(getDirectories(pluginPath));
        } catch (error) {
          reject(`Error loading plugin directory list! Error: '${error}'.`);
        }
      });
    }

    function toConfigPath(path) {
      function appendConfigFilename(pluginPath) {
        return join(pluginPath, DEFAULT_CONFIG_FILENAME);
      }

      return appendConfigFilename(path);
      //return paths.map(appendConfigFilename);
    }

    function loadPluginsConfig(configPaths) {
      return Promise.all(configPaths.map(ConfigUtils.loadConfig));
    }

    function toPlugin(config) {
      return new TodoPlugin(config);
      //return configs.map(c => new TodoPlugin(config));
    }

    /**
     * Returns the Plugins API
     * @param {*} plugins
     */
    function installPlugins(plugins) {
      //console.log('isntall');
      return Promise.all(
        plugins.map(p =>
          p.install().then(api => Promise.resolve({ ...p, api }))
        )
      );
    }

    // TODO: need names
    function addPluginApisToClient(plugins) {
      const apis = plugins.map(p => ({ [p.name]: p.api }));
      this.appState.client.addPlugins(apis);
      return Promise.resolve(plugins);
    }

    function updateViewRoutes(plugins) {
      const routes = plugins
        .filter(p => !!p.component)
        .map(p => ({
          path: `/${p.name}`,
          component: eval('require')(p.component)
        }));

      this.window.webContents.on('did-finish-load', () => {
        this.window.webContents.send('set-routes', routes);
      });

      return Promise.resolve(plugins);
    }

    return getPluginDirectoryList(resolve(join(config.plugins.path, 'core')))
      .then(map(toConfigPath))
      .then(loadPluginsConfig)
      .then(map(toPlugin))
      .then(installPlugins)
      .then(addPluginApisToClient.bind(this))
      .then(updateViewRoutes.bind(this))
      .then(_ => Promise.resolve(config));
  }

  [initUserPlugins](config) {
    console.log('Init user plugins...');
    function downloadPlugins(plugins) {
      return this.pluginService.downloadPlugins(plugins);
    }

    function loadPluginsConfig(configPaths) {
      return Promise.all(configPaths.map(ConfigUtils.loadConfig));
    }

    function toPlugins(configs) {
      return Promise.resolve(configs.map(c => new TodoPlugin(c)));
    }

    /**
     * Returns the Plugins API
     * @param {*} plugins
     */
    function installPlugins(plugins) {
      //console.log('isntall', plugins);
      return Promise.all(
        plugins.map(p =>
          p.install().then(api =>
            Promise.resolve({
              ...p,
              api
            })
          )
        )
      );
    }

    // TODO: need names
    function addPluginApisToClient(plugins) {
      console.log('add plugin to api: ');
      const apis = plugins.map(p => ({
        [p.name]: p.api
      }));
      this.appState.client.addPlugins(apis);
      return Promise.resolve(plugins);
    }

    function updateViewRoutes(plugins) {
      //console.log('UPDATE VIEW ROUTES: ', plugins);
      const routes = plugins
        .filter(p => !!p.component)
        .map(p => ({
          path: `/plugins/${p.name}`,
          component: p.getMainComponent()
        }));

      /* global is shared with the renderer processes */
      global.routes = routes;

      return Promise.resolve(plugins);
    }

    return downloadPlugins
      .call(this, config.plugins.installed)
      .then(loadPluginsConfig)
      .then(toPlugins)
      .then(plugins => {
        return Promise.all([
          installPlugins(plugins)
            .then(addPluginApisToClient.bind(this))
            .then(updateViewRoutes.bind(this, plugins))
        ]);
      })
      .then(_ => Promise.resolve(config));
  }

  init() {
    function updateAppState() {
      appState.update(this.appState);
    }

    this[loadAndInitConfig]()
      .then(this[installCorePlugins])
      .then(this[initUserPlugins])
      .then(configs => {
        //console.log('Configs: ', configs);
        updateAppState.call(this);
      })
      .catch(error => {
        console.error('Error initiating application: Error: ', error);
      });
  }
}
