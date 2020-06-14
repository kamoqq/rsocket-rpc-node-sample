const path = require('path');

module.exports = {
  entry: './client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public/dist'),
  },
};
