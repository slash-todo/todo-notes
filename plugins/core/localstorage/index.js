import { LocalStorageService } from './LocalStorageService';

export default function install() {
  return Promise.resolve(new LocalStorageService());
}
