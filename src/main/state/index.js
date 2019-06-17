import { AppState } from './app-state';

export * from './todo-config';

export const appState = new AppState();

global.todoClient = appState.client;
