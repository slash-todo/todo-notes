import { appState } from "./state";
import { ConfigService } from "./services/config.service";
import { TodoConfig } from "./state";
import { PluginService } from "./services/plugin.service";

export function init() {
  function loadAndInitConfig() {
    console.log("Load and init config...");
    const config = ConfigService.loadConfig(appState.config.configPath);
    appState.config = new TodoConfig(config);
  }

  function initPlugins() {
    console.log("Init plugins");
    PluginService.downloadPlugins(appState.config.plugins.installed)
      .then(b => console.log("Plugins downloaded: ", b))
      .catch(error => console.error("Error downloading plugins: ", error));
  }

  loadAndInitConfig();
  initPlugins();
}
