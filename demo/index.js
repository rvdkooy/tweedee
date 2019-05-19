
import { GameWorld } from '../src/engine/world';
import { ImageObject } from '../src/engine/objects';
import { keyCodes } from '../src/engine/utils';
import { Bullet, Enemy } from './objects';

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
  ]
});

const background = new ImageObject(world.getResource('background'), world.width, world.height);
const player = new ImageObject(world.getResource('player'), 70, 83, (world.width / 2), 600);

world.insert(background)
world.insert(player);

let previousOrientation = 90;

world.on('keydown', (keyCode) => {
  handleArrowKeys(keyCode, player);
  handleShootBullet(keyCode);
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

world.on('keyup', (keyCode) => {
  const direction = keyCodeToDirectionMap[keyCode];
  Number.isInteger(direction) && player.stop();
});

setInterval(() => {
  const enemies = world.gameObjects.filter(g => g instanceof Enemy);
  if (enemies.length < 3) {
    const randomX = getRandomInt((player.width / 2), world.width - (player.width / 2))
    world.insert(new Enemy(world.getResource('enemy'), 70, 75, randomX, 0));
  }
}, 2000);

world.start();