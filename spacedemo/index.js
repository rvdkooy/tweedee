import { GameWorld } from '../src/engine/world';
import { ImageObject } from '../src/engine/objects';
import { keyCodes } from '../src/engine/utils';
import { Spaceship, Laser, Scoreboard, Astroid } from './objects';

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

let _spaceship, _scoreboard = null;

world.on('keydown', (keyCode) => {
  if (_spaceship) {
    handleArrowKeys(keyCode, _spaceship);
    handleShootBullet(keyCode, _spaceship);
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

const handleShootBullet = (keyCode, spaceship) => {
  if (keyCode === keyCodes.space) {
    world.insert(new Laser((spaceship.x + (spaceship.width - 20)), (spaceship.y + (spaceship.height / 2))));
    world.getResource('shoot').play();
  }
};

const handleRestartGame = (keyCode) => {
  if (keyCode === keyCodes.enter && (world.isGameOver || !world.started)) {
    startTheGame();
  }
};

world.on('collisionDetected', ({ subject, target }) => {
  if ((subject instanceof Spaceship && target instanceof Astroid)) {
    world.gameOver();
    world.getResource('crash').play();

    world.showPopup({
      title: 'Game over!',
      text: 'Druk op de "enter" toets om opnieuw te beginnen.',
    });
  }
  if ((subject instanceof Laser && target instanceof Astroid)) {
    world.getResource('explosion').play();
    world.remove(target);
    world.remove(subject);
    _scoreboard.add(10);
  }
});

world.on('afterGameLoop', () => {
  insertAstroids();
});

const insertAstroids = () => {
  const astroids = world.gameObjects.filter(go => go instanceof Astroid);
  if (astroids.length === 0) {
    const y = world.height / 3;

    const answers = [20, 30, 40];

    const astroid1 = new Astroid(world.getResource('astroid1'), 138, 151, (world.width - 150), ((y * 1) / 2) - 75, answers[0]);
    const astroid2 = new Astroid(world.getResource('astroid1'), 138, 151, (world.width - 150), ((y * 2) / 2), answers[1]);
    const astroid3 = new Astroid(world.getResource('astroid1'), 138, 151, (world.width - 150), ((y * 3) / 2) + 75, answers[2]);

    world.insert(astroid1);
    world.insert(astroid2);
    world.insert(astroid3);

    // world.insert();

  } else {
    astroids.forEach(astroid => {
      if (astroid.x < 0 - (astroid.width * 2)) {
        world.remove(astroid);
      }
    });
  }
}

// const canvas = document.querySelector('#container canvas');
// const explosion = document.createElement('img');
// explosion.src = 'static/explosion.gif';
// canvas.appendChild(explosion);
// explosion.style.zIndex = 1000;


const startTheGame = () => {
  const spaceship = new Spaceship(world.getResource('spaceship'), 100, 60, (world.width / 8), (world.height / 2));
  // const explosion = new ImageObject(world.getResource('explosion'), 142, 200, (world.width / 2), (world.height / 2));
  const scoreboard = new Scoreboard(20, 20);
  const background = new ImageObject(world.getResource('background'), world.width, world.height);
  _scoreboard = scoreboard;
  _spaceship = spaceship;
  
  world.closePopup();
  world.reset();
  world.insert(background);
  world.insert(scoreboard);
  world.insert(spaceship);
  world.start();
};

world.showPopup({
  title: 'Welkom',
  text: 'Ben je klaar om te beginnen, druk dan op de "enter" toets',
});
