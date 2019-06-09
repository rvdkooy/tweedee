const path = require('path');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "tweedee.js",
    libraryTarget: 'umd',
  },
  target: 'web',
  context: __dirname,
  devtool: 'source-map',
}