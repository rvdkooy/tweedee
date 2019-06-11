import GameObject from './gameObject';
import Point from './point';

class Background extends GameObject {
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

export default Background;
