import { addMovement, addImage } from './mixins';

export class GameObject {
  constructor (x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.updaters = [];
  }

  update(world) {
    this.updaters.forEach(updater => updater(world, this));
  }
}

export class ImageObject extends GameObject {
  constructor(image, width, height, x, y) {
    super(x, y);
    
    addMovement.bind(this)();
    addImage.bind(this)(image, width, height);
  }
}

export class CanvasObject extends GameObject {
  constructor(updateFn) {
    super(0, 0);
    
    this.updaters.push(updateFn);
  }
}
