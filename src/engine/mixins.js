export function addImage(image, dimensions) {
  this.image = image;
  this.dimensions = dimensions;
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

export function addMovement() {
  this.direction = null;
  this.speed = 0;
  this.easeInValue = 0;
  this.boundaries = null;

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

  this.checkBoundary = (speed) => {
    if (this.boundaries) {
      if (this.direction === 0 && this.point.y - speed <= this.boundaries.top) {
        this.point.y = this.boundaries.top;
        this.stop();
      }
      // if (this.direction === 90 && this.x + speed <= this.boundaries.top) {
      //   this.y = this.boundaries.top;
      //   this.stop();
      // }
      if (this.direction === 180 && (this.point.y + speed + this.dimensions.height >= this.boundaries.bottom)) {
        this.point.y = this.boundaries.bottom - this.dimensions.height;
        this.stop();
      }
    }
  }

  this.updateMovement = function () {
    if (Number.isInteger(this.direction)) {
      if (this.options.easeIn && this.easeInValue < this.speed) {
        this.easeInValue += 1;
      }

      let speed = (this.options.easeIn) ? this.easeInValue : this.speed;
      this.checkBoundary(speed);

      if (this.direction === 0) {
        this.point.y = this.point.y - speed;
      }
      if (this.direction === 90) {
        this.point.x = this.point.x + speed;
      }
      if (this.direction === 180) {
        this.point.y = this.point.y + speed;
        
      }
      if (this.direction === 270) {
        this.point.x = this.point.x - speed;
      }
    }
  }

  this.setBoundaries = function (top, right, bottom, left) {
    this.boundaries = {
      top: top,
      right: right,
      bottom: bottom,
      left: left,
    }
  }

  this.updaters.push(this.updateMovement.bind(this));
}

export const addEventEmitter = function () {
  this.listeners = {};
  
  this.on = function(type, cb) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    } 
    this.listeners[type].push(cb);
    // return remove handler
  }

  this.emit = function (eventName, arg) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(listener => {
        listener(arg);
      });
    }
  }
}