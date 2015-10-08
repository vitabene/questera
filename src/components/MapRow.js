var MapTile = require('./MapTile');
var MapRow = module.exports = React.createClass({
  render: function() {
    var tiles = [];
    var objects = this.props.rowObjects;
    var hero;
    var heroX = this.props.tiles.length/2;
    this.props.tiles.forEach(function(tid, i) {
      if (i === heroX) {
        hero = objects;
      } else {
        hero = {};
      }
      tiles.push(<MapTile tileObject={hero} tid={tid}/>)
    });
    return (
      <tr>{tiles}</tr>
    );
  }
});
