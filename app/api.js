var actions = require('./actions');
var dispatcher = require('./dispatcher');
var constants = require('./constants');

var API = module.exports = {
	fetchQuests: function() {
		get('/api/quests').then(actions.gotQuests.bind(actions));
	},
	fetchHeroes: function() {
		get('/api/heroes').then(actions.gotHeroes.bind(actions));
	},
	// startFetchingQuests: function(){
	// 	this.fetchQuests();
	// 	return setInterval(this.fetchQuests, 10000);
	// },
	// startFetchingHeroes: function(){
	// 	this.fetchHeroes();
	// 	return setInterval(this.fetchHeroes, 50000);
	// },
	saveQuest: function(text) {
		text = text.trim();
		if (text === '') return;
		post('/api/quests', {text: text})
				.then(actions.createdQuest.bind(actions));
	},
	// follow: function(id) {
	// 	post('/api/follow/' + id).then(actions.followed.bind(actions));
	// },
	// unfollow: function(id) {
	// 	post('/api/unfollow/' + id).then(actions.unfollowed.bind(actions));
	// }
};

function get(url) {
	return fetch(url, {
		credentials: 'same-origin'
	}).then(function(res) {
		return res.json();
	});
}

function post(url, body) {
	return fetch(url, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(body || {}),
		headers: {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		}
	}).then(function(res) {
		return res.json();
	});
}

dispatcher.register(function(action){
	switch (action.actionType) {
		case constants.CREATE_QUEST:
				API.saveQuest(action.data);
				break;
			break;
		// case constants.FOLLOW:
		// 		API.follow(action.data);
		// 		break;
		// case constants.UNFOLLOW:
		// 		API.unfollow(action.data);
		// 		break;
	}
});
