var MapRow = require('./MapRow');
var React = require('react');

var Map = module.exports = module.exports = React.createClass({
  render: function() {
    // basic map
    var grid = [];
    var hero = this.props.hero;
    var heroY = this.props.map.map.length/2;
    this.props.map.map.forEach(function(row, i) {
      var objects = [];
      if (i === heroY) objects = hero;

      grid.push(<MapRow tiles={row} rowObjects={objects} key={i}/>)
    });
    // map objects
    // hero

    return (
      <table className="map" id="map">
        {grid}
      </table>
    );
  }
});
