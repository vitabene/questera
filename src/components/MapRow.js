var MapRow = React.createClass({
  render: function() {
    var tiles = [];
    this.props.tiles.forEach(function(tid) {
      tiles.push(<MapTile tid={tid}/>)
    });
    return (
      <tr>{tiles}</tr>
    );
  }
});
