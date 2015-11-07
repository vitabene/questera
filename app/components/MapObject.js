var React = require('react');

var MapObject = module.exports = React.createClass({
  render: function() {
    return (
      <div className={this.props.object.type}>
        {this.props.object.type}
      </div>
    );
  }
});
