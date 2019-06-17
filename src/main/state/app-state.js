import { TodoConfig } from './todo-config';
import { TodoClient } from '../client';
import { IpcListener } from './ipc-listener';

const initIpcListener = Symbol('initIpcListener');

export class AppState {
  constructor() {
    this.config = new TodoConfig();
    this.client = new TodoClient();
    this.listener = this[initIpcListener]();
  }

  [initIpcListener]() {
    return new IpcListener();
  }

  update(state) {
    this.config = state.config;
    this.client = state.client;
  }
}
