const createImageBehaviour = (image) => {
  return function imageBehaviour() {
    this.image = image;
    this.scaleV = 1;
    this.scaleH = 1;
  
    this.updateImage = function (world) {
      if (this.scaleV === -1 || this.scaleH === -1) {
        const x = (this.scaleV === -1) ? this.point.x * -1 : this.point.x;
        const y = (this.scaleH === -1) ? this.point.y * -1 : this.point.y;
  
        world.ctx.save();
        world.ctx.translate(world.scaler(this.dimensions.width), 0);
        world.ctx.scale(this.scaleV, this.scaleH);
        world.ctx.drawImage(this.image, world.scaler(x), world.scaler(y), world.scaler(this.dimensions.width), world.scaler(this.dimensions.height));
        world.ctx.restore();
      } else {
        world.ctx.drawImage(this.image, world.scaler(this.point.x), world.scaler(this.point.y), world.scaler(this.dimensions.width), world.scaler(this.dimensions.height));
      }
    }
  
    this.updaters.push(this.updateImage.bind(this));
    
    this.flipVertically = function () {
      this.scaleV = (this.scaleV === 1) ? -1 : 1;
    }
  
    this.flipHorizontally = function () {
      this.scaleH = (this.scaleH === 1) ? -1 : 1;
    }
  }
}

export default createImageBehaviour;
