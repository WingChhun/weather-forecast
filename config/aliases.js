const path = require('path');

module.exports = {
  src: path.resolve(`${__dirname}/../`, 'src/'),
  Components: path.resolve(`${__dirname}/../`, 'src/components'),
  Containers: path.resolve(`${__dirname}/../`, 'src/containers'),
  Context: path.resolve(`${__dirname}/../`, 'src/context'),
  Hooks: path.resolve(`${__dirname}/../`, 'src/hooks'),
  Fetches: path.resolve(`${__dirname}/../`, 'src/fetches'),
  Styles: path.resolve(`${__dirname}/../`, 'src/styles'),
  Utilities: path.resolve(`${__dirname}/../`, 'src/utils'),
  Views: path.resolve(`${__dirname}/../`, 'src/views'),
};
