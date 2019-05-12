export function addImage(image, width, height) {
  this.image = image;
  this.width = width || 0;
  this.height = height || 0;
  this.scaleV = 1;
  this.scaleH = 1;

  this.updateImage = function (world) {
    if (this.scaleV === -1 || this.scaleH === -1) {
      const x = (this.scaleV === -1) ? this.x * -1 : this.x;
      const y = (this.scaleH === -1) ? this.y * -1 : this.y;

      world.ctx.save();
      world.ctx.translate(width, 0);
      world.ctx.scale(this.scaleV, this.scaleH);
      world.ctx.drawImage(this.image, x, y, this.width, this.height);
      world.ctx.restore();
    } else {
      world.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
  
export function addMovement() {
  this.direction = null;
  this.speed = 0;
  this.easeInValue = 0;

  this.move = function (direction, speed, options) {
    this.options = options || {};
    this.direction = direction;

    if (speed !== undefined && speed !== null) {
      this.speed = speed;
    }
  }
  this.stop = function () {
    this.direction = null;
    this.speed = 0;
    this.easeInValue = 0;
  }
  this.updateMovement = function () {
    if (Number.isInteger(this.direction)) {
      if (this.options.easeIn && this.easeInValue < 10) {
        this.easeInValue += 1;
      }

      if (this.direction === 0) {
        this.y = this.y - this.easeInValue - this.speed;
      }
      if (this.direction === 90) {
        this.x = this.x + this.easeInValue + this.speed;
      }
      if (this.direction === 180) {
        this.y = this.y + this.easeInValue + this.speed;
      }
      if (this.direction === 270) {
        this.x = this.x - this.easeInValue - this.speed;
      }
    }
  }
  this.updaters.push(this.updateMovement.bind(this));
}