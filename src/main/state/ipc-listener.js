import { ipcMain } from 'electron';

import { ClientActions } from '../../shared/actions';
import { addPluginToClient, addPluginsToClient } from './ipc-handlers';

const initListeners = Symbol('initListeners');

export class IpcListener {
  constructor() {
    this[initListeners]();
  }

  [initListeners]() {
    ipcMain.on(ClientActions.ADD_PLUGIN, addPluginToClient);
    ipcMain.on(ClientActions.ADD_PLUGINS, addPluginsToClient);
  }
}
