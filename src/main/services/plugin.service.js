import { existsSync, mkdirSync, mkdir } from 'fs';
import download from 'download-git-repo';
import { appState } from '../state';
import {
  DEFAULT_PLUGINS_PATH,
  DEFAULT_CONFIG_FILENAME
} from '../state/constants';
import { join } from 'path';

const createDirectoryStructure = Symbol('createDirectoryStructure');
const downloadByGit = Symbol('downloadByGit');

export class PluginService {
  static [createDirectoryStructure](path) {
    console.log('process.cwd(): ', process.cwd());
    return new Promise((resolve, reject) => {
      mkdir(path, { recursive: true }, error => {
        if (error) {
          reject(
            `Error creating directory structure for '${path}'! (Error: ${error})`
          );
        }

        resolve();
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
   * @param {{name, version, git, npm}} plugin
   */
  static downloadPlugin(plugin) {
    function download() {
      if (plugin.git) {
        console.log('DOWNLOAD FROM GUT');
        return PluginService[downloadByGit](plugin.git, installPath);
      }
    }

    const pluginPath = appState.plugins.path || DEFAULT_PLUGINS_PATH;
    const installPath = `${pluginPath}/${plugin.name}/${plugin.version}`;
    if (!existsSync(`${installPath}/${DEFAULT_CONFIG_FILENAME}`)) {
      return PluginService[createDirectoryStructure](
        join(process.cwd(), installPath)
      ).then(download);
    }

    // TODO: check plugin version
    return Promise.resolve();
  }

  static downloadPlugins(plugins) {
    return Promise.all(plugins.map(PluginService.downloadPlugin));
  }
}
