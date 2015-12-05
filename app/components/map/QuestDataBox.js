import React, { PropTypes } from 'react'

class QuestDataBox extends React.Component {
  render () {
    return (
      <div className="quest-data-box">
        <div>
          <p>Quest name</p>
          <em>added-dd-mm</em>
          <em>time-estimate</em>
        </div>
        <div>
          <ul>
            <li>notes</li>
            <li>notes</li>
            <li>notes</li>
            <li>notes</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default QuestDataBox
