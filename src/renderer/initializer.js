import { remote } from 'electron';

export class RendererInitializer {
  constructor() {}

  init() {
    console.log('Renderer Plugins: ', remote.getGlobal('plugins'));
  }
}
