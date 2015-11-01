var constants = require('../constants');

var HeroStore = module.exports = require('./store').extend({
  init: function () {
    this.bind(constants.GOT_HEROES, this.set);
  },
  currentHero: HERO,
  updateHero: function(data) {
    this.currentHero = data;
  }
});
