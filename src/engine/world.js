export class GameWorld {
  constructor (selector, options) {
    this.options = options || {};
    
    const container = document.querySelector(selector);

    addResources.bind(this)(container, this.options);
    addKeyListeners.bind(this)();
    addEventEmitter.bind(this)();
    addCanvas.bind(this)(container, this.options.width, this.options.height);
    
    this.gameObjects = [];
  }

  start() {
    this.gameLoop();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  gameLoop() {
    this.clear();

    this.gameObjects.forEach(gameObject => gameObject.update(this));
    
    window.requestAnimationFrame(() => {
      this.gameLoop();
    });
  }
  insert(obj) {
    this.gameObjects.push(obj);
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
  }
  container.appendChild(resContainer);

  this.getResource = function (name) {
    const resource = document.querySelector(`[data-name='${name}']`);
    if (!resource) {
      throw new Error(`Couldn't find resource for: '${name}', please register this as an image resource!`);
    }
    return resource;
  }
}

const addEventEmitter = function () {
  this.listeners = {};
  
  this.on = function(type, cb) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    } 
    this.listeners[type].push(cb);
    // return remove handler
  }
}

const addKeyListeners = function() {
  this.keysDown = [];
  
  document.addEventListener('keydown', (e) => {
    this.keysDown.push(e.keyCode);
    
    if (this.listeners['keydown']) {
      this.listeners['keydown'].forEach(listener => {
        listener(e.keyCode);
      });
    }
  });

  document.addEventListener('keyup', (e) => {
    this.keydown = this.keysDown.filter(x => x !== e.keyCode);
    
    if (this.listeners['keyup']) {
      this.listeners['keyup'].forEach(listener => {
        listener(e.keyCode);
      });
    }
  });
};

const addCanvas = function (container, width, height) {
  this.width = width || 1024;
  this.height = height || 769;
  
  this.calculateDimensions = function () {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    if (windowWidth > windowHeight) {
      this.scale = ( windowHeight / height );
      canvas.width = this.scaler(this.width);
      canvas.height = this.scaler(this.height);
    } else {
      this.scale = ( windowWidth / width );
      canvas.width = this.scaler(this.width);
      canvas.height = this.scaler(this.height);
    }
  };

  this.scaler = function (input) {
    return input * this.scale;
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'world';
  container.appendChild(canvas);
  this.ctx = canvas.getContext("2d");

  window.addEventListener('resize', () => {
    this.calculateDimensions();
  });

  this.calculateDimensions();
};
