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
    world.ctx.arc(world.scaler(this.x), world.scaler(this.y), world.scaler(this.radius), 0, 2 * Math.PI, false);
    world.ctx.fillStyle = 'red';
    world.ctx.fill();
  }
}

export class Player extends ImageObject {
  constructor(image, x, y) {
    super(image, x, y);
  }
}

export class Enemy extends ImageObject {
  constructor(image, x, y) {
    super(image, x, y);
    
    this.move(180, 5);
  }
}