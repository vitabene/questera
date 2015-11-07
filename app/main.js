import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, Link} from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Logout from './components/Logout'
import API from './api'

API.fetchQuests();
API.fetchHeroes();
API.fetchMap();

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="logout" component={Logout}/>
    </Route>
  </Router>
), document.getElementById('app'))
