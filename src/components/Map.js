var Map = React.createClass({
  render: function() {
    var grid = [];
    this.props.map.map.forEach(function(row, i) {
      grid.push(<MapRow tiles={row} key={i}/>)
    });
    return (
      <table className="map" id="map">
        {grid}
      </table>
    );
  }
});
