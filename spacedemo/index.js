import { GameWorld } from '../src/engine/world';
import { Background } from '../src/engine/objects';
import { keyCodes, getRandomInt } from '../src/engine/utils';
import { Spaceship, Laser, Scoreboard, Astroid, Exercises } from './objects';

const keyCodeToDirectionMap = {
  [keyCodes.arrowup]: 0,
  [keyCodes.arrowdown]: 180,
};

const world = new GameWorld('#container', {
  resources: [
    { type: 'image', name: 'background', src: 'static/background.jpg' },
    { type: 'image', name: 'spaceship', src: 'static/spaceship.png' },
    { type: 'image', name: 'astroid1', src: 'static/astroid_1.png' },
    { type: 'sound', name: 'shoot', src: 'static/shoot.wav' },
    { type: 'sound', name: 'explosion', src: 'static/explosion.wav' },
    { type: 'sound', name: 'crash', src: 'static/crash.wav' },
    // { type: 'image', name: 'explosion', src: 'static/explosion.gif' },
  ],
  enableCollisionDetection: true,
});

let _spaceship, _scoreboard, _exercises = null;

world.on('keydown', (keyCode) => {
  if (_spaceship) {
    handleArrowKeys(keyCode, _spaceship);
    handleShootLaser(keyCode, _spaceship);
  }
  handleRestartGame(keyCode);
});

const handleArrowKeys = (keyCode, spaceship) => {
  const direction = keyCodeToDirectionMap[keyCode];
  Number.isInteger(direction) && spaceship.move(direction, 8, { easeIn: true });
};

world.on('keyup', (keyCode) => {
  const direction = keyCodeToDirectionMap[keyCode];
  Number.isInteger(direction) && _spaceship.stop();
});

const handleShootLaser = (keyCode, spaceship) => {
  if (keyCode === keyCodes.space) {
    world.insert(new Laser((spaceship.x + (spaceship.width)), (spaceship.y + (spaceship.height / 2))));
    world.getResource('shoot').play();
  }
};

const handleRestartGame = (keyCode) => {
  if (keyCode === keyCodes.enter && (world.isGameOver || !world.started)) {
    startTheGame();
  }
};

world.on('collisionDetected', ({ subject, target }) => {
  if ((subject instanceof Spaceship && target instanceof Astroid) ||
    (subject instanceof Laser && target instanceof Spaceship)) {
      world.gameOver();
      world.getResource('crash').play();
  
      world.showPopup({
        title: 'Game over!',
        text: 'Druk op de "enter" toets         om opnieuw te beginnen.',
      });
  }
  
  if ((subject instanceof Laser && target instanceof Astroid)) {
    if (target.answer === _exercises.answer) {
      world.getResource('explosion').play();
      world.remove(target);
      world.remove(subject);
      world.gameObjects.filter(go => go instanceof Astroid).forEach(go => {
        go.move(go.direction, go.speed * 3);
      });
      _scoreboard.add(10);
    } else {
      subject.move(270, (subject.speed * 1.5));
      target.move(270, (target.speed * 1.5));
    }
  }
});

world.on('afterGameLoop', () => {
  const astroids = world.gameObjects.filter(go => go instanceof Astroid);
  if (astroids.length === 0) {
    insertAstroids();
  } else {
    astroids.forEach(astroid => {
      if (astroid.x < 0 - (astroid.width * 2)) {
        world.remove(astroid);
      }
    });
  }
});

const insertAstroids = () => {
  const y = world.height / 3;
  _exercises.createNew();
  const answers = _exercises.getRandomAnswers();
  const astroid1 = new Astroid(world.getResource('astroid1'), 138, 151, (world.width - getRandomInt(130, 170)), ((y * 1) / 2) - 75, answers[0]);
  const astroid2 = new Astroid(world.getResource('astroid1'), 138, 151, (world.width - getRandomInt(130, 170)), ((y * 2) / 2), answers[1]);
  const astroid3 = new Astroid(world.getResource('astroid1'), 138, 151, (world.width - getRandomInt(130, 170)), ((y * 3) / 2) + 75, answers[2]);

  world.insert(astroid1);
  world.insert(astroid2);
  world.insert(astroid3);
}

const startTheGame = () => {
  const spaceship = new Spaceship(world.getResource('spaceship'), 100, 60, (world.width / 8), (world.height / 2));
  const scoreboard = new Scoreboard();
  const background = new Background(world.getResource('background'), world.width, world.height);
  const exercises = new Exercises((world.width / 2), world.height - 50);
  _scoreboard = scoreboard;
  _spaceship = spaceship;
  _exercises = exercises;

  world.closePopup();
  world.reset();
  world.insert(background);
  world.insert(scoreboard);
  world.insert(exercises);
  world.insert(spaceship);
  world.start();
};

world.showPopup({
  title: 'Welkom',
  text: 'Ben je klaar om te beginnen, druk dan op de "enter" toets',
});
