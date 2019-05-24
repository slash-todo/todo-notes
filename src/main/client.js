export class TodoClient {
  constructor() {
    this.plugins = {};
  }

  addPlugin(plugin) {
    this.plugins = { ...this.plugins, plugin };
  }

  addPlugins(plugins) {
    this.plugins = { ...this.plugins, ...plugins };
  }
}
