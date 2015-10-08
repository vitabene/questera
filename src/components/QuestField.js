var QuestField = module.exports = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var questInput = React.findDOMNode(this.refs.quest);
    if (questInput.value === '') return;
    var inputDataObject = {};
    inputDataObject.name = questInput.value;
    this.props.addQuest(inputDataObject);
    questInput.value = '';
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className="quest-field-box">
        <input className="quest-field" ref="quest" id="questField"/>
        <button className="questSubmitButton"></button>
      </form>
    );
  }
});
