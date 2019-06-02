import { addEventEmitter } from './mixins';

export class GameWorld {
  constructor (selector, options) {
    this.options = options || {};
    this.gameObjects = [];
    this.isGameOver = false;
    this.started = false;
    this.container = document.querySelector(selector);

    addResources.bind(this)(this.container, this.options);
    addKeyListeners.bind(this)();
    addEventEmitter.bind(this)();
    addCanvas.bind(this)(this.container, options);
    if (options.enableCollisionDetection) {
      addCollisionDetection.bind(this)();
    }
  }

  start() {
    this.started = true;
    this.isGameOver = false;
    this.gameLoop();
  }

  reset() {
    this.gameObjects = [];
  }

  gameOver() {
    this.isGameOver = true;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  gameLoop() {
    if (this.isGameOver) return;

    this.emit('beforeGameLoop', this);
    this.clear();
    this.gameObjects.forEach(gameObject => gameObject.update(this));
    this.emit('afterGameLoop', this);

    window.requestAnimationFrame(() => {
      this.gameLoop();
    });
  }
  insert(obj) {
    this.gameObjects.push(obj);
  }

  remove(obj) {
    this.gameObjects = this.gameObjects.filter(go => go !== obj);
  }

  showPopup (content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.width = this.scaler(this.width) + 'px';
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    if (content.title) {
      const title = document.createElement('h1');
      title.innerHTML = content.title;
      modalContent.appendChild(title);
    }

    if (content.text) {
      const text = document.createElement('div');
      text.innerHTML = content.text;
      modalContent.appendChild(text);
    }

    if (content.buttons && content.buttons.length) {
      content.buttons.forEach(b => {
        const button = document.createElement('button');
        button.innerHTML = b.text;
        button.addEventListener('click', b.onClick);
        modalContent.appendChild(button);
      });
    }
    modal.appendChild(modalContent);
    this.container.appendChild(modal);
  }
  closePopup () {
    const modal = this.container.querySelector('.modal');
    if (modal) {
      modal.parentNode.removeChild(modal);
    }
  }
}

const addResources = function (container, options) {
  const resContainer = document.createElement('div');
  resContainer.style.display = 'none';
    
  if (options.resources) {
    options.resources.filter(r => r.type === 'image').forEach(r => {
      const image = document.createElement('img');
      image.src = r.src;
      image.id = r.src;
      image.dataset.name = r.name;
      resContainer.append(image);
    });

    options.resources.filter(r => r.type === 'sound').forEach(r => {
      const audio = document.createElement('audio');
      audio.src = r.src;
      audio.id = r.src;
      audio.dataset.name = r.name;
      resContainer.append(audio);
    });
  }
  container.appendChild(resContainer);

  this.getResource = function (name) {
    const resource = document.querySelector(`[data-name='${name}']`);
    if (!resource) {
      throw new Error(`Couldn't find resource for: '${name}', please register this as an image resource!`);
    }
    return resource.cloneNode();
  }
}

const addKeyListeners = function() {
  this.keysDown = [];
  
  window.addEventListener('keydown', (e) => {
    this.keysDown.push(e.keyCode);
    this.emit('keydown', e.keyCode);
  });

  window.addEventListener('keyup', (e) => {
    this.keydown = this.keysDown.filter(x => x !== e.keyCode);
    
    if (this.listeners['keyup']) {
      this.listeners['keyup'].forEach(listener => {
        listener(e.keyCode);
      });
    }
  });
};

const addCanvas = function (container, options) {
  this.width = options.width || 1024;
  this.height = options.height || 769;
  
  this.calculateDimensions = function (canv) {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    if (windowWidth > windowHeight) {
      this.scale = ( windowHeight / this.height );
      container.style.width = this.scaler(this.width) + 'px';
      container.style.height = this.scaler(this.height) + 'px';
      canv.width = this.scaler(this.width);
      canv.height = this.scaler(this.height);
    } else {
      this.scale = ( windowWidth / this.width );
      container.style.width = this.scaler(this.width) + 'px';
      container.style.height = this.scaler(this.height) + 'px';
      canv.width = this.scaler(this.width);
      canv.height = this.scaler(this.height);
    }
  };

  this.scaler = function (input) {
    return input * this.scale;
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'world';
  container.appendChild(canvas);
  this.calculateDimensions(canvas);
  this.ctx = canvas.getContext("2d");
  
  window.addEventListener('resize', () => this.calculateDimensions(canvas));
  canvas.focus();
};

const addCollisionDetection = function () {
  this.on('afterGameLoop', (world) => {
    const collisionables = world.gameObjects.filter(x => x.x && x.y && x.width && x.height);
    collisionables.forEach(subject => {
      collisionables.filter(x => x !== subject).forEach(target => {
        if (subject.x < target.x + target.width &&
          subject.x + subject.width > target.x &&
          subject.y < target.y + target.height &&
          subject.y + subject.height > target.y) {
            world.emit('collisionDetected', { subject, target });
        }
      });
    });
  });
};
