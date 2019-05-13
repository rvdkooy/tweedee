import { GameObject } from "../src/engine/objects";
import { addMovement } from '../src/engine/mixins';

export class Bullet extends GameObject {
  constructor(x, y) {
    super(x, y);
    
    this.radius = 5;
    addMovement.bind(this)();
    this.updaters.push(this.drawBullet.bind(this));
    this.move(90, 15);
  }

  drawBullet(world) {
    this.x = this.x + this.speed;
    world.ctx.beginPath();
    world.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    world.ctx.fillStyle = 'red';
    world.ctx.fill();
  }
}