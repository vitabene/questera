var constants = require('../constants');

var MapObjectStore = module.exports = require('./store').extend({
  init: function () {
    this.bind(constants.GOT_MAP_OBJECTS, this.set);
  },
  updateObjects: function(data) {
    this._data = data;
  }
});
