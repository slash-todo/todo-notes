import { Sticky } from '../models';

export class StickiesService {
  static loadStickies() {
    return [new Sticky('This is my first Sticky')];
  }
}
