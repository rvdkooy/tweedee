import { addMovement, addImage, addEventEmitter } from './mixins';

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

export class SpriteSheetImageObject extends GameObject {
  constructor(image, x, y, width, height) {
    super(x, y, width, height);
    this.image = image;
    this.sWidth = width;
    this.sHeight = height;

    this.repeat = false;
    this.frames = Math.round(image.width / width);
    this.speed = 0;
    this.currentFrame = 0;
    this.updaters.push(this.drawSpritesheetImage.bind(this));

    addEventEmitter.bind(this)();
  }
  drawSpritesheetImage(world) {
    if (this.currentFrame >= this.frames) {
      this.emit('done', this);
      return;
    } 

    if (this.currentFrame >= this.frames && this.repeat) {
      this.currentFrame = 0;
      this.emit('repeat', this);
    }

    world.ctx.drawImage(this.image, (this.currentFrame * this.width), 0, 
      this.sWidth, this.sHeight, world.scaler(this.x), world.scaler(this.y),
      world.scaler(this.width), world.scaler(this.height));

    this.speed = this.speed + 0.1;
    const roundedSpeed = Math.round(this.speed);
    this.currentFrame += roundedSpeed;
    if (roundedSpeed === 1) {
      this.speed = 0;
    }
  }
}

export class ImageObject extends GameObject {
  constructor(image, x, y, width, height) {
    super(x, y);

    addMovement.bind(this)();
    addImage.bind(this)(image, width || image.width, height || image.height);
  }
}

export class CanvasObject extends GameObject {
  constructor(updateFn) {
    super(0, 0);

    this.updaters.push(updateFn);
  }
}
