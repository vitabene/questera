var React = require('react');
var actions = require('../actions');
var QuestStore = require('../stores/questStore');

var Home = React.createClass({
  getInitialState: function() {
    return {
      quests: QuestStore.all()
    };
  },
  mixins: [QuestStore.mixin],
  onChange: function() {
    this.setState(this.getInitialState());
  },
  saveQuest: function (text) {
      actions.createQuest(text);
  },
  render: function () {
      return (
        <div>
          <ChirpInput onSave={this.saveChirp} />
          <ChirpList chirps={this.state.chirps} />
        </div>
      );
  }
});

module.exports = Home;
