var constants = require('../constants');

var MapStore = module.exports = require('./store').extend({
  init: function () {
    this.bind(constants.GOT_MAP, this.set);
  },
  updateMap: function(data) {
    this._data = data;
  }
});
