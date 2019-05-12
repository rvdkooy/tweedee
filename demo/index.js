
import { GameWorld } from '../src/engine/world';
import { ImageObject } from '../src/engine/objects';
import { keyCodes } from '../src/engine/utils';

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
  ]
});

const background = new ImageObject(world.getResource('background'), world.width, world.height);
const player = new ImageObject(world.getResource('player'), 70, 83);

world.insert(background)
world.insert(player);

let previousDirection = null;

world.on('keydown', (keyCode) => {
  const direction = keyCodeToDirectionMap[keyCode];
  Number.isInteger(direction) && player.move(direction, 4, { easeIn: true });

  if (keyCode === keyCodes.arrowleft && previousDirection === 90 ||
    keyCode === keyCodes.arrowright && previousDirection === 270) {
    player.flipVertically();
  }
  if (keyCode === keyCodes.arrowleft || keyCode === keyCodes.arrowright) {
    previousDirection = direction;
  }
});

world.on('keyup', (keyCode) => {
  const direction = keyCodeToDirectionMap[keyCode];
  Number.isInteger(direction) && player.stop();
});

world.start();
