var React = require('react');
var ReactDOM = require('react-dom');
var API = require('./api');
var App = require('./components/App');
var Home = require('./components/Home');
var Welcome = require('./components/Welcome');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

// API.startFetchingQuests();
// API.startFetchingHeroes();
API.fetchQuests();
API.fetchHeroes();
var root = <App />;
ReactDOM.render(root, document.getElementById('app'));
