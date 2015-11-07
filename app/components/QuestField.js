var React = require('react');
var QuestField = module.exports = React.createClass({
  getInitialState: function() {
    return {
      value: ''
    };
  },
  handleChange: function (evt) {
      this.setState({
          value: evt.target.value
      });
  },
  handleClick: function (evt) {
      this.props.addQuest(this.state.value);
      this.setState({
          value: ''
      });
  },
  render: function() {
    return (
      <div className="quest-field-box">
        <input className="quest-field" placeholder='What have you got to do?' value={this.state.value} onChange={this.handleChange} id="questField"/>
        <button className="questSubmitButton" onClick={this.handleClick}></button>
      </div>
    );
  }
});
