var constants = require('../constants');
var HeroStore = require('./heroStore');

var QuestStore = module.exports = require('./store').extend({
	init: function() {
		this.bind(constants.GOT_CHIRPS, this.set);
		this.bind(constants.CHIRPED, this.add);
	},
	timeline: function() {
		// var ids = [HeroStore.currentHero.cid].concat(HeroStore.currentHero.following);
		// return this._data.filter(function(chirp) {
		// 	return ids.indexOf(chirp.userId) > -1;
		// });
		return this._data;
	},
	// for when looking up other users
	// byHeroId: function(id) {
	// 	return this._data.filter(function(chirp) {
	// 		return chirp.userId === id;
	// 	});
	// }
});
