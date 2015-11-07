var React = require('react');
var HeroBoard = require('./HeroBoard');
var QuestBoard = require('./QuestBoard');
var Home = require('./Home');

var App = React.createClass({
  render: function(){
    return (
      <div>
        <Home />
      </div>
    );
  }
});
module.exports = App;
