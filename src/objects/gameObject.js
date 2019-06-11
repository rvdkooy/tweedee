import Point from './point';
import Dimensions from './dimensions';
import eventEmitter from  '../behaviours/eventEmitter';

class GameObject {
  constructor(point, dimensions, behaviours) {
    if (!point instanceof Point) {
      throw new Error('point should be an instance of Point');
    }

    if (!dimensions instanceof Dimensions) {
      throw new Error('dimensions should be an instance of Dimensions');
    }

    this.point = point || Point.none();;
    this.dimensions = dimensions || Dimensions.none();
    this.updaters = [];
    
    eventEmitter.bind(this)();

    if (behaviours) {
      behaviours.forEach(b => this.addBehaviour(b));
    }
  }

  addBehaviour(behaviour) {
    behaviour.bind(this)();
  }

  update(world) {
    this.emit('beforeUpdate');
    this.updaters.forEach(updater => updater(world, this));
    this.emit('afterUpdate');
  }
}

export default GameObject;
