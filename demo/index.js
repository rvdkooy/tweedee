
import { GameWorld } from '../src/engine/world';
import { ImageObject } from '../src/engine/objects';
import { keyCodes } from '../src/engine/utils';
import { Bullet, Enemy, Player } from './objects';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const keyCodeToDirectionMap = {
  [keyCodes.arrowright]: 90,
  [keyCodes.arrowleft]: 270,
}

const world = new GameWorld('#container', {
  resources: [
    { type: 'image', name: 'background', src: 'static/background.jpg' },
    { type: 'image', name: 'player', src: 'static/player.png' },
    { type: 'image', name: 'enemy', src: 'static/enemy.png' },
  ],
  enableCollisionDetection: true,
});

const background = new ImageObject(world.getResource('background'), world.width, world.height);
const player = new Player(world.getResource('player'), 70, 83, (world.width / 2), 600);

let previousOrientation = 90;

world.on('keydown', (keyCode) => {
  handleArrowKeys(keyCode, player);
  handleShootBullet(keyCode);
  handleRestartGame(keyCode);
});

const handleArrowKeys = (keyCode, player) => {
  const direction = keyCodeToDirectionMap[keyCode];
  Number.isInteger(direction) && player.move(direction, 8, { easeIn: true });

  if (keyCode === keyCodes.arrowleft && previousOrientation === 90 ||
    keyCode === keyCodes.arrowright && previousOrientation === 270) {
    player.flipVertically();
  }
  if (keyCode === keyCodes.arrowleft || keyCode === keyCodes.arrowright) {
    previousOrientation = direction;
  }
};

const handleShootBullet = (keyCode) => {
  if(keyCode === keyCodes.space) {
    world.insert(new Bullet((player.x + (player.width / 2)), (player.y + (player.height / 2))));
  }
};

const handleRestartGame = (keyCode) => {
  if(keyCode === keyCodes.space && (world.isGameOver || !world.started)) {
    player.x = (world.width / 2);
    startTheGame();
  }
};

world.on('keyup', (keyCode) => {
  const direction = keyCodeToDirectionMap[keyCode];
  Number.isInteger(direction) && player.stop();
});

setInterval(() => {
  if (world.isGameOver) return;

  const enemies = world.gameObjects.filter(g => g instanceof Enemy);
  if (enemies.length < 3) {
    const randomX = getRandomInt((player.width / 2), world.width - (player.width / 2))
    world.insert(new Enemy(world.getResource('enemy'), 70, 75, randomX, 0));
  }
}, 2000);

world.on('collisionDetected', ({ subject, target }) => {
  if ((subject instanceof Player && target instanceof Enemy)) {
    world.gameOver();

    world.showPopup({
      title: 'Game over!',
      text: 'Druk op de spatie balk om opnieuw te beginnen.',
    });
  }
});

const startTheGame = () => {
  world.closePopup();
  world.reset();
  world.insert(background)
  world.insert(player);
  world.start();
};

world.showPopup({
  title: 'Welkom',
  text: 'Ben je klaar om te beginnen, druk dan op de spatiebalk',
});

