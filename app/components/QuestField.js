import React, { PropTypes } from 'react'

class QuestField extends React.Component {
  constructor(){
    super();
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
      this.props.addQuest(this.state.value);
      this.setState({
          value: ''
      });
  }
  handleChange(e) {
      this.setState({
          value: e.target.value
      });
  }
  render () {
    return (
      <div className="quest-field-box">
        <input className="quest-field" placeholder='What is your quest?' value={this.state.value} onChange={this.handleChange} id="questField"/>
        <button className="questSubmitButton" onClick={this.handleClick}></button>
      </div>
    );
  }
}

export default QuestField
