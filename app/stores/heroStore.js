var constants = require('../constants');

var HeroStore = module.exports = require('./store.js').extend({
  init: function () {
    this.bind(constants.GOT_HEROES, this.set);
  },
  currentHero: HERO,
  updateHero: function(data) {
    this._data = data;
  },
  getHero: function() {
    return this._data[0] ? this._data[0] : this.currentHero
  }
});
