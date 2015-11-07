var React = require('react');
var actions = require('../actions');
var QuestStore = require('../stores/questStore');
var HeroStore = require('../stores/heroStore');
var HeroBoard = require('./HeroBoard');
var QuestBoard = require('./QuestBoard');

var Home = React.createClass({
  getInitialState: function() {
    return {
      quests: QuestStore.all(),
      hero: HeroStore.currentHero
    };
  },
  saveQuest: function (text) {
      actions.createQuest(text);
  },
  mixins: [QuestStore.mixin],
  onChange: function() {
    this.setState(this.getInitialState());
  },
  render: function () {
      return (
        <div>
          <HeroBoard hero={this.state.hero}/>
          <Map quests={this.state.quests}/>
          <QuestBoard addQuest={this.saveQuest} quests={this.state.quests}/>
        </div>
      );
  }
});

module.exports = Home;
