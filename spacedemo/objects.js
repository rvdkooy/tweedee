import { GameObject, Dimensions } from '../src/objects';
import { movement, collisions, createImageBehaviour } from '../src/behaviours';
import { getRandomInt } from '../src/utils';

export class Laser extends GameObject {
  constructor(point) {
    super(point, new Dimensions(20, 5), [movement, collisions]);
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

export class Astroid extends GameObject {
  constructor(image, point, answer) {
    super(point, new Dimensions(image.width, image.height), [
      createImageBehaviour(image),
      movement,
      collisions
    ]);
    this.answer = answer;
    this.updaters.push(this.drawAnswer.bind(this));
    this.fullSpeed = 5;
    this.move(270, 2);
  }

  drawAnswer(world) {
    world.ctx.font = `${world.scaler(40)}px Arial`;
    world.ctx.fillStyle = 'white';
    world.ctx.fillText(this.answer, world.scaler(this.point.x + 50), world.scaler(this.point.y + 85));
  }
}

export class Spaceship extends GameObject {
  constructor(image, point) {
    super(point, new Dimensions(image.width, image.height), [
      createImageBehaviour(image),
      movement,
      collisions
    ]);
  }
}

export class Scoreboard extends GameObject {
  constructor(image, point) {
    super(point, Dimensions.none(), [
      createImageBehaviour(image),
    ]);
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