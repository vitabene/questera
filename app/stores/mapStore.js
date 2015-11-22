var constants = require('../constants');

var MapStore = module.exports = require('./store').extend({
  init: function () {
    this.bind(constants.GOT_MAP, this.set);
  },
  currentMap: function(){
    if (this._data[0] != undefined) return this._data[0]
  },
  updateMap: function(data) {
    this._data = data;
  }
});
