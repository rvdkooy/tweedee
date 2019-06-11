import GameObject from './gameObject';

class SpriteSheetObject extends GameObject {
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

export default SpriteSheetObject;