var HeroBoard = require('./HeroBoard');
var QuestBoard = require('./QuestBoard');
var Map = require('./Map');

var Game = module.exports = React.createClass({
  getInitialState: function(){
    return {qid: 0, quests: []};
  },
  createQuest: function(inputQuestObject) {
    return {
      id: this.state.qid,
      name: inputQuestObject.name,
      type: "Monster",
      done: false,
      created: new Date().getTime()
    };
  },
  addQuest: function(inputQuestObject){
    var questToAdd = this.createQuest(inputQuestObject);
    this.setState(function(previousState, currentProps) {
      var newQuests = previousState.quests;
      newQuests.push(questToAdd);
      return {id: this.state.qid++, quests: newQuests};
    });
  },
  render: function(){
    return (
      <div>
        <HeroBoard hero={this.props.hero} />
        <Map map={this.props.map} hero={this.props.hero} quests={this.state.quests} mapobjects={this.props.mapobjects}/>
        <QuestBoard quests={this.state.quests} addQuest={this.addQuest} />
      </div>
    );
  }
});
