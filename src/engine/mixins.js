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

  this.move = function (direction, speed) {
      this.direction = direction;
      this.speed = speed;
  }
  this.updateMovement = function () {
    if (this.direction && this.direction === 0) {
      this.y = this.y - this.speed;
    }
    if (this.direction && this.direction === 90) {
      this.x = this.x + this.speed;
    }
    if (this.direction && this.direction === 180) {
      this.y = this.y + this.speed;
    }
    if (this.direction && this.direction === 270) {
      this.x = this.x - this.speed;
    }
  }
  this.updaters.push(this.updateMovement.bind(this));
}