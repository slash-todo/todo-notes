import { TodoConfig } from './todo-config';
import { TodoClient } from '../client';

export class AppState {
  constructor() {
    this.config = new TodoConfig();
    this.client = new TodoClient();
  }

  update(state) {
    this.config = state.config;
    this.client = state.client;
  }
}
