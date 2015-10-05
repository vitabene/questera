var MapTile = React.createClass({
  render: function() {
    return (
      <td tid={this.props.tid} className={"map-tile " + TERRAINS[this.props.tid]}></td>
    );
  }
});
