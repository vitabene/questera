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
	fetchObjects: function() {
		get('/api/objects').then(actions.gotMapObjects.bind(actions));
	},
	updateQuest(data) {
		data.id = data.id.trim();
		if (data.id === '') return;
		post('/api/quests/update', {
			Id: data.id,
			Text: data.text,
			Type: "",
			Created: "",
			Coords: {x:0, y:0},
			Completed: data.completed
		}).then(actions.updatedQuest.bind(actions));
	},
	saveQuest: function(text) {
		text = text.trim();
		if (text === '') return;
		post('/api/quests/create', {
			Id: "",
			Text: text,
			Type: "Monster",
			Created: String(new Date().getTime()),
			Coords: {x: getRandomInt(0, 32), y:getRandomInt(0, 32)}
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
		case constants.UPDATE_QUEST:
				API.updateQuest(action.data);
				break;
	}
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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
