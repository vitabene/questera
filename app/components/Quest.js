import React, { PropTypes } from 'react'

const questTypes = ['Monster'];

class Quest extends React.Component {
  render () {
    return (
      <div className="quest">
        <img className="quest__image image" src={"assets/" + questTypes[this.props.quest.Type].toLowerCase() + ".png"} />
        <span className="quest__name">{this.props.quest.Name}</span>
      </div>
    );
  }
}
export default Quest
