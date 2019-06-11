class Point {
  constructor(x, y) {
    if (x === undefined || y === undefined) {
      throw new Error('x of y should be set for a Point object');
    }
    
    this.x = x || 0;
    this.y = y || 0;
  }

  static none () {
    return new Point(0, 0);
  }
}

export default Point;
