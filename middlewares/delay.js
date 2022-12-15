const config = require('../json-server.json');

module.exports = (req, res, next) => {
  setTimeout(() => next(), config.delay);
};
