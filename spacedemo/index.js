import { GameWorld } from '../src/world';
import { Background,SpriteSheetObject, Dimensions, Point, GameObject } from '../src/objects';
import { keyCodes, isCollision, getRandomInt } from '../src/utils';
import { Spaceship, Laser, Scoreboard, Astroid, Exercises, TouchButtons } from './objects';

const isTouchDevice = () => {
  return ('ontouchstart' in window) || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch;
};

const keyCodeToDirectionMap = {
  [keyCodes.arrowup]: 90,
  [keyCodes.arrowdown]: 270,
};

const world = new GameWorld('#container', {
  resources: [
    { type: 'image', name: 'background', src: 'static/background.png' },
    { type: 'image', name: 'spaceship', src: 'static/spaceship.png' },
    { type: 'image', name: 'astroid1', src: 'static/astroid_1.png' },
    { type: 'image', name: 'dashboard', src: 'static/dashboard.png' },
    { type: 'image', name: 'explosionspritesheet', src: 'static/explosion.png' },
    { type: 'sound', name: 'shoot', src: 'static/shoot.wav' },
    { type: 'sound', name: 'explosion', src: 'static/explosion.wav' },
    { type: 'sound', name: 'crash', src: 'static/crash.wav' },
  ],
  enableCollisionDetection: true,
});

let _spaceship, _scoreboard, _exercises, _touchButtons = null;

const checkWhichButtonPressed = (e) => {
  if (_spaceship && _touchButtons) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    const touchPoint = new GameObject(new Point(x / world.scale, y / world.scale), new Dimensions(10, 10));
    
    if (isCollision(_touchButtons.upButtonDimensions, touchPoint)) {
      handleArrowKeys(keyCodes.arrowup, _spaceship);
    }
    if (isCollision(_touchButtons.downButtonDimensions, touchPoint)) {
      handleArrowKeys(keyCodes.arrowdown, _spaceship);
    }
    if (isCollision(_touchButtons.shootButtonDimensions, touchPoint)) {
      handleShootLaser(keyCodes.space, _spaceship);
    }
  }
}

world.on('touchstart', checkWhichButtonPressed);

world.on('touchend', () => {
  if (_spaceship) {
    _spaceship.stop()
  }
});

world.on('keydown', (keyCode) => {
  if (_spaceship) {
    handleArrowKeys(keyCode, _spaceship);
    handleShootLaser(keyCode, _spaceship);
  }
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
    world.insert(new Laser(new Point((spaceship.point.x + (spaceship.dimensions.width)), (spaceship.point.y + (spaceship.dimensions.height / 2)))));
    world.getResource('shoot').play();
  }
};

world.on('collisionDetected', ({ subject, target }) => {
  const addExplosionTo = (point, cb) => {
    const explosion = new SpriteSheetObject(world.getResource('explosionspritesheet'), point, new Dimensions(142, 200));
    explosion.frames = 8;
    explosion.on('afterUpdate', () => {
      if (explosion.currentFrame >= explosion.frames) {
        world.remove(explosion);
        cb && cb();
      }
    });
    world.insert(explosion);
  }
  
  
  if ((subject instanceof Spaceship && target instanceof Astroid) ||
    (subject instanceof Spaceship && target instanceof Laser)) {
      world.remove(subject);
      world.getResource('crash').play();
      addExplosionTo(subject.point, () => {
        world.gameOver();
        world.showPopup({
          title: 'Game over!',
          buttons: [{ text: 'Opnieuw beginnen', onClick: startTheGame }],
        });
      });
  }
  
  if ((subject instanceof Laser && target instanceof Astroid)) {
    if (target.answer === _exercises.answer) {
      world.getResource('explosion').play();
      
      addExplosionTo(target.point);
      
      world.remove(target);
      world.remove(subject);
      world.gameObjects.filter(go => go instanceof Astroid).forEach(go => {
        go.move(go.direction, go.fullSpeed);
      });
      _scoreboard.add(10);
    } else {
      subject.move(180, (subject.speed * 1.3));
      target.move(180, target.fullSpeed);
    }
  }
});

world.on('afterGameLoop', () => {
  const astroids = world.gameObjects.filter(go => go instanceof Astroid);
  if (astroids.length === 0) {
    insertAstroids();
  } else {
    astroids.filter(astroid => astroid.point.x < 0 - (astroid.dimensions.width * 2)).forEach(astroid => world.remove(astroid));
  }
  world.gameObjects.filter(go => go instanceof Laser && (go.point.x + go.dimensions.width) > world.dimensions.width).forEach(laser => world.remove(laser));
});

const insertAstroids = () => {
  const y = world.dimensions.height / 3;
  _exercises.createNew();
  const answers = _exercises.getRandomAnswers();
  const astroid1 = new Astroid(world.getResource('astroid1'), new Point((world.dimensions.width - getRandomInt(130, 170)), ((y * 1) / 2) - 75), answers[0]);
  const astroid2 = new Astroid(world.getResource('astroid1'), new Point((world.dimensions.width - getRandomInt(130, 170)), ((y * 2) / 2)), answers[1]);
  const astroid3 = new Astroid(world.getResource('astroid1'), new Point((world.dimensions.width - getRandomInt(130, 170)), ((y * 3) / 2) + 75), answers[2]);

  world.insert(astroid1);
  world.insert(astroid2);
  world.insert(astroid3);
}

const startTheGame = () => {
  const spaceship = new Spaceship(world.getResource('spaceship'), new Point(100, (world.dimensions.height / 2)));
  spaceship.setBoundaries(40, world.dimensions.width, world.dimensions.height - 120, 0);
  
  const background = new Background(world.getResource('background'), world.dimensions);
  const scoreboard = new Scoreboard(world.getResource('dashboard'), new Point(0, world.dimensions.height - 120));
  const exercises = new Exercises();
  _scoreboard = scoreboard;
  _spaceship = spaceship;
  _exercises = exercises;
  
  world.closePopup();
  world.reset();
  world.insert(background);
  world.insert(scoreboard);
  world.insert(exercises);
  world.insert(spaceship);

  if (isTouchDevice()) {
    const touchButtons = new TouchButtons(world.dimensions);
    _touchButtons = touchButtons;
    world.insert(touchButtons);
  }

  world.start();
};

world.showPopup({
  title: 'Klaar om te beginnen?',
  text: [ (isTouchDevice()) ?
          'Gebruik de pijlen om je ruimteschip te besturen en de rode knop om op een rots te schieten' :
          'Gebruik de pijltjes toetsen om je ruimteschip te besturen en de spatiebalk om een rots te schieten',
          '',
        ].join('<br /><br />'),
  buttons: [{ text: 'Start', onClick: startTheGame }],
});



