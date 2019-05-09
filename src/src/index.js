
import { GameWorld } from './engine/world';
import { BackGround, Player } from './models';

const world = new GameWorld('#container', {
  resources: [
    { type: 'image', src: 'background.jpg' },
    { type: 'image', src: 'player.png' },
  ]
});

const player = new Player();
player.move(180, 2);

world.insert(new BackGround(world.width, world.height))
world.insert(player);
world.start();


// document.addEventListener('keydown', (e) => keyDownEvent(world, player, e.keyCode));
// document.addEventListener('keyup', (e) => keyUpEvent(world, player, e.keyCode));