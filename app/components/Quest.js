var React = require('react');
var Quest = module.exports = React.createClass({
  render: function() {
    return (
      <div className="quest">
        <img className="quest__image image" src={"assets/" + this.props.quest.type.toLowerCase() + ".png"} />
        <span className="quest__name">{this.props.quest.name}</span>
      </div>
    );
  }
});
