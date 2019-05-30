import { ImageObject, GameObject } from '../src/engine/objects';
import { addMovement } from '../src/engine/mixins';

export class Laser extends GameObject {
  constructor(x, y) {
    super(x, y, 20, 5);
    addMovement.bind(this)();
    this.updaters.push(this.drawLaser.bind(this));
    this.move(90, 15);
  }

  drawLaser(world) {
    world.ctx.beginPath();
    world.ctx.moveTo(world.scaler(this.x), world.scaler(this.y));
    world.ctx.lineTo(world.scaler(this.x) + this.width, world.scaler(this.y));
    world.ctx.strokeStyle = "#FF0000";
    world.ctx.lineWidth = this.height;
    world.ctx.stroke(); 
  }
}

export class Astroid extends ImageObject {
  constructor(image, width, height, x, y, answer) {
    super(image, width, height, x, y);
    this.answer = answer;
    addMovement.bind(this)();
    this.updaters.push(this.drawAnswer.bind(this));
    this.move(270, 1);
  }

  drawAnswer(world) {
    world.ctx.font = '40px Arial';
    world.ctx.fillStyle = 'white';
    world.ctx.fillText(this.answer, world.scaler(this.x + 50), world.scaler(this.y + 85));
  }
}

export class Spaceship extends ImageObject {
  constructor(image, width, height, x, y) {
    super(image, width, height, x, y);
  }
}

export class Scoreboard extends GameObject {
  constructor(x, y) {
    super (x, y);
    this.updaters.push(this.drawScoreboard.bind(this));
    this.score = 0;
  }

  add (score) {
    this.score += score;
  }

  drawScoreboard (world) {
    world.ctx.font = '30px Verdana';
    world.ctx.fillStyle = 'white';
    world.ctx.fillText(`Score: ${this.score}`, 10, 50);
  }
}