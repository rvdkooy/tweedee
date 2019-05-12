export function addImage(image, width, height) {
  this.image = image;
  this.width = width || 0;
  this.height = height || 0;

  this.updateImage = function (world) {
    world.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  this.updaters.push(this.updateImage.bind(this));
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