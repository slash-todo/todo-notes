import { TodoConfig } from './todo-config';

export * from "./todo-config";

export const appState = {
  config: new TodoConfig(),
  plugins: {}
};
