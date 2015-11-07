var constants = require('../constants');

var MapStore = module.exports = require('./store').extend({
  init: function () {
    this.bind(constants.GOT_MAP, this.set);
  },
  updateHero: function(data) {
    this.currentHero = data;
  }
});
