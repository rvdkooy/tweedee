export class GameWorld {
  constructor (selector, options) {
    options = options || {};

    const container = document.querySelector(selector);
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    canvas.className = 'world';

    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.gameObjects = [];
    // this.listeners = {};
    
    const resContainer = document.createElement('div');
    resContainer.style.display = 'none';
    
    if (options.resources) {
      options.resources.filter(r => r.type === 'image').forEach(r => {
        const image = document.createElement('img');
        image.src = r.src;
        image.id = r.src;
        resContainer.append(image);
      });
    }

    container.appendChild(resContainer);
    container.appendChild(canvas);
  }

  start() {
    this.gameLoop();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  gameLoop() {
    this.clear();

    // if (this.listeners['gameLoop']) {
    //   this.listeners['gameLoop'].forEach(listener => {
    //     listener(this);
    //   });
    // }

    this.gameObjects.forEach(gameObject => gameObject.update(this));

    window.requestAnimationFrame(() => {
      this.gameLoop();
    });
  }
  insert(obj) {
    this.gameObjects.push(obj);
  }

  // on(type, cb) {
  //   if (!this.listeners[type]) {
  //     this.listeners[type] = [];
  //   } 
  //   this.listeners[type].push(cb);
  //   // return remove handler
  // }
}

export class GameObject {
  constructor (x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.updaters = [];
  }

  update(world) {
    this.updaters.forEach(updater => updater(world, this));
  }
}