import actions from './actions'
import Dispatcher from './dispatcher'
import constants from './constants'

const API = {
	fetchQuests: function() {
		get('/api/quests').then(actions.gotQuests.bind(actions));
	},
	fetchHeroes: function() {
		get('/api/hero').then(actions.gotHeroes.bind(actions));
	},
	fetchMap: function() {
		get('/api/map').then(actions.gotMap.bind(actions));
	},
	saveQuest: function(text) {
		text = text.trim();
		if (text === '') return;
		post('/api/quests/create', {
			Text: text,
			Type: "Monster",
			Created: String(new Date().getTime())
		}).then(actions.createdQuest.bind(actions));
	},
	startFetchingQuests: function(){
		this.fetchQuests();
		return setInterval(this.fetchQuests, 3000);
	}
};

export default API

Dispatcher.register(function(action){
	switch (action.actionType) {
		case constants.CREATE_QUEST:
				API.saveQuest(action.data);
				break;
			break;
		// case constants.FOLLOW:
		// 		API.follow(action.data);
		// 		break;
	}
});

function get(url) {
	return fetch(url, {
		credentials: 'include'
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