const { StickiesService } = require('./services/StickiesService');

module.exports = function install(todoClient) {
  StickiesService.getInstance(todoClient); // initialize StickiesService
  return Promise.resolve(null);
};
