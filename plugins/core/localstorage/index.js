const LocalStorageService = require('./LocalStorageService');

module.exports = function install() {
  return Promise.resolve(new LocalStorageService());
};
