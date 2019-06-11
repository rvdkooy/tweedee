import { ImageObject, GameObject, Dimensions } from '../src/engine/objects';
import { addMovement } from '../src/engine/mixins';
import { getRandomInt } from '../src/engine/utils';

export class Laser extends GameObject {
  constructor(point) {
    super(point, new Dimensions(20, 5));
    addMovement.bind(this)();
    this.updaters.push(this.drawLaser.bind(this));
    this.move(90, 15);
  }

  drawLaser(world) {
    world.ctx.beginPath();
    world.ctx.moveTo(world.scaler(this.point.x), world.scaler(this.point.y));
    world.ctx.lineTo(world.scaler(this.point.x) + this.dimensions.width, world.scaler(this.point.y));
    world.ctx.strokeStyle = "#FF0000";
    world.ctx.lineWidth = this.dimensions.height;
    world.ctx.stroke(); 
  }
}

export class Astroid extends ImageObject {
  constructor(image, point, answer) {
    super(image, point);
    this.answer = answer;
    addMovement.bind(this)();
    this.updaters.push(this.drawAnswer.bind(this));
    this.move(270, 1);
    this.fullSpeed = 3;
  }

  drawAnswer(world) {
    world.ctx.font = `${world.scaler(40)}px Arial`;
    world.ctx.fillStyle = 'white';
    world.ctx.fillText(this.answer, world.scaler(this.point.x + 50), world.scaler(this.point.y + 85));
  }
}

export class Spaceship extends ImageObject {
  constructor(image, point, dimensions) {
    super(image, point, dimensions);
  }
}

export class Scoreboard extends ImageObject {
  constructor(image, point) {
    super(image, point);
    this.updaters.push(this.drawScoreboard.bind(this));
    this.score = 0;
  }

  add (score) {
    this.score += score;
  }

  drawScoreboard (world) {
    world.ctx.save();
    world.ctx.font = `${world.scaler(30)}px Arial`;
    world.ctx.fillStyle = 'white';
    world.ctx.textAlign = "left"; 
    
    world.ctx.fillText('Score:  ' + this.score, world.scaler(20), world.scaler(30));

    // world.ctx.fillText('Levens:', world.scaler(120), world.scaler(world.height - 45));
    // world.ctx.fillText("1", world.scaler(350), world.scaler(world.height - 45));

    world.ctx.restore();
  }
}

export class Exercises extends GameObject {
  constructor(point) {
    super (point);
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
    world.ctx.font = `${world.scaler(60)}px Arial`;
    world.ctx.fillStyle = 'white';
    world.ctx.textAlign = "center"; 
    world.ctx.fillText('Som:', world.scaler(280), world.scaler(world.dimensions.height - 40));
    world.ctx.fillText(this.text, world.scaler(510), world.scaler(world.dimensions.height - 40));
    world.ctx.restore();
  }
}