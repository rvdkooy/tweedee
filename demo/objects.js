import { GameObject, ImageObject } from "../src/engine/objects";
import { addMovement } from '../src/engine/mixins';

export class Bullet extends GameObject {
  constructor(x, y) {
    super(x, y);
    
    this.radius = 5;
    addMovement.bind(this)();
    this.updaters.push(this.drawBullet.bind(this));
    this.move(0, 15);
  }

  drawBullet(world) {
    world.ctx.beginPath();
    world.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    world.ctx.fillStyle = 'red';
    world.ctx.fill();
  }
}

export class Enemy extends ImageObject {
  constructor(image, width, height, x, y) {
    super(image, width, height, x, y);
    
    this.move(180, 5);
  }
}