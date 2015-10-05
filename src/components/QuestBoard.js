var Questboard = React.createClass({
  render: function() {
    var quests = [];
    for (var i = this.props.quests.length - 1; i >= 0; i--) {
        quests.push(<Quest quest={this.props.quests[i]} key={this.props.quests[i].created}/>);
    };
    return (
      <div className="questboard" id="questboard">
      <QuestField addQuest={this.props.addQuest}/>
        {quests}
      </div>
    );
  }
});
