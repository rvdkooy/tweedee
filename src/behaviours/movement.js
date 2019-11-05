function movementBehaviour() {
    this.direction = null;
    this.speed = 0;
    this.easeInValue = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.boundaries = null;
  
    this.move = function (direction, speed, options) {
      this.options = options || {};
      this.direction = direction;
      
      if (speed !== undefined && speed !== null) {
        this.speed = (this.options.easeIn) ? this.easeInValue : speed;
        this.deltaX = (speed * Math.cos(direction * Math.PI / 180));
        this.deltaY = -(speed * Math.sin(direction * Math.PI / 180));
      }
    }
  
    this.stop = function () {
      this.direction = null;
      this.speed = 0;
      this.easeInValue = 0;
    }
  
    this.checkBoundary = (speed) => {
      if (this.boundaries) {
        if (this.direction === 90 && this.point.y - speed <= this.boundaries.top) {
          this.point.y = this.boundaries.top;
          this.stop();
        }
        // if (this.direction === 90 && this.x + speed <= this.boundaries.top) {
        //   this.y = this.boundaries.top;
        //   this.stop();
        // }
        if (this.direction === 270 && (this.point.y + speed + this.dimensions.height >= this.boundaries.bottom)) {
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
  
        this.checkBoundary(this.speed);
        this.point.x += this.deltaX;
        this.point.y += this.deltaY;
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
  