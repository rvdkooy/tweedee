
import { GameWorld } from '../src/engine/world';
import { ImageObject } from '../src/engine/objects';
import { keyCodes } from '../src/engine/utils';
import { Bullet } from './objects';

const keyCodeToDirectionMap = {
  [keyCodes.arrowup]: 0,
  [keyCodes.arrowright]: 90,
  [keyCodes.arrowdown]: 180,
  [keyCodes.arrowleft]: 270,
}

const world = new GameWorld('#container', {
  resources: [
    { type: 'image', name: 'background', src: 'static/background.jpg' },
    { type: 'image', name: 'player', src: 'static/player.png' },
  ],
  width: 1024,
  height: 768,
});

const background = new ImageObject(world.getResource('background'), world.width, world.height);
const player = new ImageObject(world.getResource('player'), 70, 83);

world.insert(background)
world.insert(player);

let previousDirection = null;

world.on('keydown', (keyCode) => {
  handleArrowKeys(keyCode, player);
  handleShootBullet(keyCode);
});

const handleArrowKeys = (keyCode, player) => {
  const direction = keyCodeToDirectionMap[keyCode];
  Number.isInteger(direction) && player.move(direction, 5, { easeIn: true });

  if (keyCode === keyCodes.arrowleft && previousDirection === 90 ||
    keyCode === keyCodes.arrowright && previousDirection === 270) {
    player.flipVertically();
  }
  if (keyCode === keyCodes.arrowleft || keyCode === keyCodes.arrowright) {
    previousDirection = direction;
  }
};

const handleShootBullet = (keyCode) => {
  if(keyCode === keyCodes.space) {
    const bullet = new Bullet((player.x + (player.width / 2)), (player.y + (player.height / 2)));
    world.insert(bullet);
  }
};

world.on('keyup', (keyCode) => {
  const direction = keyCodeToDirectionMap[keyCode];
  Number.isInteger(direction) && player.stop();
});

world.start();
