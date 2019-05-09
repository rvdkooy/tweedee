import { addImage, addMovement } from './engine/mixins';
import { GameObject } from './engine/world';

export class Player extends GameObject {
  constructor() {
    super();
    addImage.bind(this)('player.png', 140, 166);
    addMovement.bind(this)();
  }
}
  
export class BackGround extends GameObject {
  constructor (width, height) {
    super();
    addImage.bind(this)('background.jpg', width, height);
  }
}