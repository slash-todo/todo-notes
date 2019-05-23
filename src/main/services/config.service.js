import { readFileSync } from 'fs';

export class ConfigService {
  static loadConfig(path) {
    let config = readFileSync(path, 'utf8');
    config = JSON.parse(config);
    console.log('THIS IS THE CONFIG: ', config);
    return config;
  }
}
