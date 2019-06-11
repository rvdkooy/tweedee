class Dimensions {
  constructor(width, height) {
    if (width === undefined || height === undefined) {
      throw new Error('Width of Height should be set for a Dimensions object');
    }

    this.width = width || 0;
    this.height = height || 0;
  }

  static none() {
    return new Dimensions(0, 0);
  }
}

export default Dimensions;