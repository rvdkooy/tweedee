
import { GameWorld } from '../src/engine/world';
import { ImageObject } from '../src/engine/objects';
import { keyCodes } from '../src/engine/utils';

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

world.on('keydown', (keyCode) => {
  if (keyCode === keyCodes.arrowleft) {
    player.move(270, 4, { easeIn: true });
  }
  if (keyCode === keyCodes.arrowright) {
    player.move(90, 4, { easeIn: true });
  }
  if (keyCode === keyCodes.arrowdown) {
    player.move(180, 4, { easeIn: true });
  }
  if (keyCode === keyCodes.arrowup) {
    player.move(0, 4, { easeIn: true });
  }

});

world.on('keyup', (keyCode) => {
  if (keyCode === keyCodes.arrowleft || keyCode === keyCodes.arrowright ||
    keyCode === keyCodes.arrowup || keyCode === keyCodes.arrowdown) {
    player.stop();
  }
});

world.start();
