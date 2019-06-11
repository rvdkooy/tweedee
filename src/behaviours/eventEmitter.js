const eventEmitter = function () {
  this.listeners = {};

  this.on = function (type, cb) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(cb);
    // return remove handler
  }

  this.emit = function (eventName, arg) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(listener => {
        listener(arg);
      });
    }
  }
}

export default eventEmitter;
