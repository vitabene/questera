import QuestField from './QuestField'
import Quest from './Quest'
import React, { PropTypes } from 'react'

class QuestBoard extends React.Component {
  render () {
    let quests = [];
    for (let i = this.props.quests.length - 1; i >= 0; i--) {
        quests.push(<Quest quest={this.props.quests[i]} key={this.props.quests[i].created}/>);
    };
    return (
      <div className="questboard" id="questboard">
      <QuestField addQuest={this.props.addQuest}/>
        {quests}
      </div>
    );
  }
}
export default QuestBoard
