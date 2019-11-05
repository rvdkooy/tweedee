const path = require('path');

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  target: 'web',
  context: __dirname,
  devtool: 'source-map',
}