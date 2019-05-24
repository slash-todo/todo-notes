import {
  existsSync,
  mkdir,
  lstatSync,
  rmdirSync,
  readdirSync,
  unlinkSync
} from 'fs';
import download from 'download-git-repo';
import { appState } from '../state';
import {
  DEFAULT_PLUGINS_PATH,
  DEFAULT_CONFIG_FILENAME
} from '../state/constants';
import { join } from 'path';

const deleteDirectory = Symbol('deleteDirectory');
const createDirectoryStructure = Symbol('createDirectoryStructure');
const downloadByGit = Symbol('downloadByGit');

export class PluginService {
  static [deleteDirectory](dirPath) {
    if (existsSync(dirPath)) {
      readdirSync(dirPath).forEach(function(file) {
        var curPath = join(dirPath, file);
        if (lstatSync(curPath).isDirectory()) {
          // recurse
          PluginService[deleteDirectory](curPath);
        } else {
          // delete file
          unlinkSync(curPath);
        }
      });
      rmdirSync(dirPath);
      return Promise.resolve(dirPath);
    }

    return Promise.resolve(dirPath);
  }

  static [createDirectoryStructure](path) {
    return new Promise((resolve, reject) => {
      mkdir(path, { recursive: true }, error => {
        if (error) {
          reject(
            `Error creating directory structure for '${path}'! (Error: ${error})`
          );
        }

        resolve(path);
      });
    });
  }

  static [downloadByGit](repoUrl, destination) {
    return new Promise((resolve, reject) => {
      download(`direct:${repoUrl}`, destination, { clone: true }, error => {
        if (error) {
          reject(error);
        }

        resolve();
      });
    });
  }

  /**
   * Downloads resources from git or npm
   * @param {{[pluginName]: version | npm | giturl}} plugin
   *
   * @returns {Promise<string>} Promise of the path to the plugins config file
   */
  static downloadPlugin(plugin) {
    /**
     * PluginMeta is a different representation the plugin data
     */
    function convertToPluginMeta(plugin) {
      function isGit(url) {
        return url.startsWith('http') || url.endsWith('.git');
      }

      const keys = Object.keys(plugin);
      if (keys.length !== 1) {
        throw new Error(
          `Plugin definition '${plugin}' has the wrong format! Should be '{[pluginName]: version | npm | giturl}'.`
        );
      }
      const pluginMeta = {};
      const pluginName = keys[0];
      const pluginInfo = plugin[pluginName];
      pluginMeta.name = pluginName;
      if (isGit(pluginInfo)) {
        pluginMeta.git = pluginInfo;
      }

      return pluginMeta;
    }

    function download(installPath) {
      if (plugin.git) {
        return PluginService[downloadByGit](plugin.git, installPath);
      }

      throw new Error(
        `No source for '${
          plugin.name
        }' provided! Please define 'git' or 'npm' in the apps configuration.`
      );
    }

    plugin = convertToPluginMeta(plugin);
    const pluginPath = appState.config.plugins.path || DEFAULT_PLUGINS_PATH;
    const installPath = join(process.cwd(), `${pluginPath}/${plugin.name}`);
    const configFilePath = join(installPath, DEFAULT_CONFIG_FILENAME);

    if (!existsSync(configFilePath)) {
      return PluginService[deleteDirectory](installPath)
        .then(PluginService[createDirectoryStructure])
        .then(download)
        .then(() => Promise.resolve(configFilePath));
    }

    // TODO: check plugin version
    return Promise.resolve(`${installPath}/${DEFAULT_CONFIG_FILENAME}`);
  }

  static downloadPlugins(plugins) {
    return Promise.all(
      Object.keys(plugins)
        .map(key => ({ [key]: plugins[key] }))
        .map(PluginService.downloadPlugin)
    );
  }
}
