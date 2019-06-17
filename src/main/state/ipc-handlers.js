import { appState } from './index';

export function addPluginToClient(plugin) {
  appState.client.addPlugin(plugin);
}

export function addPluginsToClient(plugins) {
  appState.client.addPlugins(plugins);
}
