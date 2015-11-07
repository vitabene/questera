import MapTile from './MapTile'
import React, { PropTypes } from 'react'

class MapRow extends React.Component {
  render () {
    let tiles = [];
    let objects = this.props.rowObjects;
    let hero;
    let heroX = this.props.tiles.length/2;
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
}
export default MapRow
