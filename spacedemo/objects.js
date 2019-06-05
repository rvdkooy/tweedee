import { ImageObject, GameObject } from '../src/engine/objects';
import { addMovement } from '../src/engine/mixins';
import { getRandomInt } from '../src/engine/utils';

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
  constructor(image, x, y, answer) {
    super(image, x, y);
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

export class Scoreboard extends ImageObject {
  constructor(image, width, height, x, y) {
    super(image, width, height, x, y);
    this.updaters.push(this.drawScoreboard.bind(this));
    this.score = 0;
  }

  add (score) {
    this.score += score;
  }

  drawScoreboard (world) {
    world.ctx.save();
    world.ctx.font = '70px Arial';
    world.ctx.fillStyle = 'white';
    world.ctx.textAlign = "center"; 
    
    world.ctx.fillText('Score', world.scaler(670), world.scaler(world.height - 45));
    world.ctx.fillText(this.score, world.scaler(880), world.scaler(world.height - 45));

    world.ctx.restore();
  }
}

export class Exercises extends GameObject {
  constructor(x, y) {
    super (x, y);
    this.updaters.push(this.updateExercise.bind(this));
    this.text = "";
    this.answer = null;
  }

  createNew () {
    const a = getRandomInt(1, 10);
    const b = getRandomInt(1, 10);
    this.a = a;
    this.b = b;
    this.text = a + ' x ' + b;
    this.answer = a * b;
  }

  getRandomAnswers () {
    const result = new Array(3);
    const position = getRandomInt(0, 2);
    result[position] = this.answer;
    for (let index = 0; index <= 2; index++) {
      if (index !== position) {
        let b = getRandomInt(1, 10);
        while (b === this.b) {
          b = getRandomInt(1, 10);
        }
        result[index] = this.a * b;
      }
    }
    return result;    
  }

  updateExercise(world) {
    world.ctx.save();
    world.ctx.font = '70px Arial';
    world.ctx.fillStyle = 'white';
    world.ctx.textAlign = "center"; 

    world.ctx.fillText('Som', world.scaler(120), world.scaler(world.height - 45));
    world.ctx.fillText(this.text, world.scaler(340), world.scaler(world.height - 45));

    world.ctx.restore();
  }
}