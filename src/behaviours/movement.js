function movementBehaviour() {
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

  export default movementBehaviour;
  