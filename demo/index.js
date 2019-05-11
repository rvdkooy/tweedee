
import { GameWorld } from '../src/engine/world';
import { ImageObject } from '../src/engine/objects';

const world = new GameWorld('#container', {
  resources: [
    { type: 'image', name: 'background', src: 'static/background.jpg' },
    { type: 'image', name: 'player', src: 'static/player.png' },
  ]
});
const background = new ImageObject(world.getResource('background'), world.width, world.height);
const player = new ImageObject(world.getResource('player'), 140, 166);

player.move(90, 4);

world.insert(background)
world.insert(player);
world.start();


// document.addEventListener('keydown', (e) => keyDownEvent(world, player, e.keyCode));
// document.addEventListener('keyup', (e) => keyUpEvent(world, player, e.keyCode));