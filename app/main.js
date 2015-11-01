var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var API = require('./api');

var routes = (
  <Route handler={require('./components/App')}>
    <Route path='/' component={require('./components/Home')}/>
  </Route>
);

// <Route name='heroes' handler={require('./components/HeroList')}/>
// <Route name='hero' path='/hero/:id' handler={require('./components/HeroProfile')}/>
// API.startFetchingQuests();
// API.startFetchingHeroes();
API.fetchQuests();
API.fetchHeroes();

// ReactRouter.run(routes, ReactRouter.HistoryLocation, function(Root){
//   React.render(<Root />, document.getElementById('app'));
// });
React.render(<ReactRouter>{routes}</ReactRouter>, document.getElementById('app'));
