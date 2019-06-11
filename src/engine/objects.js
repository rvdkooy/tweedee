import { addMovement, addImage, addEventEmitter } from './mixins';

export class Point {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  static none () {
    return new Point(0, 0);
  }
}

export class Dimensions {
  constructor (width, height) {
    this.width = width || 0;
    this.height = height || 0;
  }

  static none () {
    return new Dimensions(0, 0);
  }
}

export class GameObject {
  constructor(point, dimensions) {
    if (!point instanceof Point) {
      throw new Error('point should be an instance of Point');
    }

    if (!dimensions instanceof Dimensions) {
      throw new Error('dimensions should be an instance of Dimensions');
    }

    this.point = point || Point.none();;
    this.dimensions = dimensions || Dimensions.none();
    this.updaters = [];
    addEventEmitter.bind(this)();
  }

  update(world) {
    this.emit('beforeUpdate');
    this.updaters.forEach(updater => updater(world, this));
    this.emit('afterUpdate');
  }
}

export class Background extends GameObject {
  constructor(image, dimensions, scrollOptions) {
    super(Point.none(), dimensions);
    this.image = image;
    if (scrollOptions) {
      this.scrollOptions = scrollOptions;
    }
    this.updaters.push(this.drawBackground.bind(this));
  }

  drawBackground(world) {
    if (!this.scrollOptions) {
      world.ctx.drawImage(this.image, 0, 0, world.scaler(this.dimensions.width), world.scaler(this.dimensions.height));
    } else {
      const { speed, direction } = this.scrollOptions;
      this.scrollValue = this.scrollValue || 0;
      const canvasWidth = world.scaler(world.dimensions.width);
      if (this.scrollValue >= canvasWidth) {
        this.scrollValue = 0;
      }

      if (direction === 90) {
        this.scrollValue = this.scrollValue += speed;
        world.ctx.drawImage(this.image, Math.round(this.scrollValue - canvasWidth), 0, world.scaler(this.dimensionswidth), world.scaler(this.dimensions.height));
        world.ctx.drawImage(this.image, Math.round(this.scrollValue), 0, world.scaler(this.dimensions.width), world.scaler(this.dimensions.height));
      } else if (direction === 270) {
        this.scrollValue -= speed;
        world.ctx.drawImage(this.image, Math.round(this.scrollValue + canvasWidth), 0, world.scaler(this.dimensions.width), world.scaler(this.dimensions.height));
        world.ctx.drawImage(this.image, Math.round(this.scrollValue), 0, world.scaler(this.dimensions.width), world.scaler(this.dimensions.height));
      }
    }
  }
}

export class SpriteSheetImageObject extends GameObject {
  constructor(image, point, dimensions) {
    super(point, dimensions);
    this.image = image;
    this.sWidth = dimensions.width;
    this.sHeight = dimensions.height;

    this.repeat = false;
    this.frames = Math.round(image.width / dimensions.width);
    this.speed = 0;
    this.currentFrame = 0;
    this.updaters.push(this.drawSpritesheetImage.bind(this));
  }
  drawSpritesheetImage(world) {
    if (this.currentFrame >= this.frames) {
      return;
    } 

    if (this.currentFrame >= this.frames && this.repeat) {
      this.currentFrame = 0;
    }

    world.ctx.drawImage(this.image, (this.currentFrame * this.dimensions.width), 0, 
      this.sWidth, this.sHeight, world.scaler(this.point.x), world.scaler(this.point.y),
      world.scaler(this.dimensions.width), world.scaler(this.dimensions.height));

    this.speed = this.speed + 0.1;
    const roundedSpeed = Math.round(this.speed);
    this.currentFrame += roundedSpeed;
    if (roundedSpeed === 1) {
      this.speed = 0;
    }
  }
}

export class ImageObject extends GameObject {
  constructor(image, point) {
    super(point);

    addMovement.bind(this)();
    addImage.bind(this)(image, new Dimensions(image.width, image.height));
  }
}
