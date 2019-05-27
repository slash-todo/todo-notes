import { Point } from './Point';
import { Size } from './Size';

export class Sticky {
  constructor(
    text,
    color = '#ff6e4b',
    position = new Point(10, 10),
    size = new Size(200, 200)
  ) {
    this.text = text;
    this.color = color;
    this.position = position;
    this.size = size;
  }
}
