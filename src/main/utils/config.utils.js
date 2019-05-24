import { readFile } from 'fs';
import { dirname } from 'path';

export class ConfigUtils {
  static loadConfig(path) {
    return new Promise((resolve, reject) => {
      readFile(path, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        }

        try {
          const config = JSON.parse(data);
          resolve({ ...config, root: dirname(path) });
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  }
}
