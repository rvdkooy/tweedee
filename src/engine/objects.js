import { addMovement, addImage } from './mixins';

export class GameObject {
  constructor (x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.updaters = [];
  }

  update(world) {
    this.updaters.forEach(updater => updater(world, this));
  }
}

export class ImageObject extends GameObject {
  constructor(image, width, height) {
    super();
    
    addMovement.bind(this)();
    addImage.bind(this)(image, width, height);

    // this.image = image;
    // this.width = width;
    // this.height = height;
    // this.updaters.push(this.updateImage.bind(this));
  }

  // updateImage (world) {
  //   world.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  // }
}

