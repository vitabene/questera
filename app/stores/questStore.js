var constants = require('../constants');
var HeroStore = require('./heroStore');

var QuestStore = module.exports = require('./store.js').extend({
	init: function() {
		this.bind(constants.GOT_QUESTS, this.set);
		this.bind(constants.CREATED_QUEST, this.add);
	},
	timeline: function() {
		// var ids = [HeroStore.currentHero.cid].concat(HeroStore.currentHero.following);
		// return this._data.filter(function(chirp) {
		// 	return ids.indexOf(chirp.userId) > -1;
		// });
		return this._data;
	},
	allIncomplete: function() {
		var incompleteQuests = [];
		for (var i = 0; i < this._data.length; i++) {
			this._data[i].completed ? "" : incompleteQuests.push(this._data[i])
		}
		return incompleteQuests
		// return this._data.filter(function(quest) {
		// 	return quest.completed == 0;
		// });
	}
	// for when looking up other users
	// byHeroId: function(id) {
	// 	return this._data.filter(function(chirp) {
	// 		return chirp.userId === id;
	// 	});
	// }
});
