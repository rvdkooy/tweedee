import { addMovement, addImage } from './mixins';

export class GameObject {
  constructor(x, y, width, height) {
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

export class Background extends GameObject {
  constructor(image, width, height, scrollOptions) {
    super(0, 0, width, height);
    this.image = image;
    if (scrollOptions) {
      this.scrollOptions = scrollOptions;
    }
    this.updaters.push(this.drawBackground.bind(this));
  }

  drawBackground(world) {
    if (!this.scrollOptions) {
      world.ctx.drawImage(this.image, 0, 0, world.scaler(this.width), world.scaler(this.height));
    } else {
      const { speed, direction } = this.scrollOptions;
      this.scrollValue = this.scrollValue || 0;
      const canvasWidth = world.scaler(world.width);
      if (this.scrollValue >= canvasWidth) {
        this.scrollValue = 0;
      }

      if (direction === 90) {
        this.scrollValue = this.scrollValue += speed;
        world.ctx.drawImage(this.image, Math.round(this.scrollValue - canvasWidth), 0, world.scaler(this.width), world.scaler(this.height));
        world.ctx.drawImage(this.image, Math.round(this.scrollValue), 0, world.scaler(this.width), world.scaler(this.height));
      } else if (direction === 270) {
        this.scrollValue -= speed;
        world.ctx.drawImage(this.image, Math.round(this.scrollValue + canvasWidth), 0, world.scaler(this.width), world.scaler(this.height));
        world.ctx.drawImage(this.image, Math.round(this.scrollValue), 0, world.scaler(this.width), world.scaler(this.height));
      }
    }
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
