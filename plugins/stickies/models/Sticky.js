import { Point } from './Point';

export class Sticky {
  constructor(text, color = 'yellow', position = new Point(10, 10)) {
    this.text = text;
    this.color = color;
    this.position = position;
  }
}
