export function addImage(src, width, height) {
  this.src = src;
  this.width = width || 0;
  this.height = height || 0;

  this.updateImage = function (world) {
    const image = document.getElementById(this.src);
    if (!image) {
      throw new Error(`Couldn't find image for: '${this.src}', please register this as an image resource!`);
    }
    world.ctx.drawImage(image, this.x, this.y, this.width, this.height);
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